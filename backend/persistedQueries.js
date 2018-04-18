const { parse, validate } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const Redis = require('ioredis')
const typeDefs = require('./schemas')

const client = new Redis()

const PQ = 'persisted-queries'

const schema = makeExecutableSchema({
  typeDefs,
})

const sendQuery = (req, next, data) => {
  req.query = data
  next()
}

const sendErrors = (res, next, msg, errors) => {
  res.json({ errors })
  return next(new Error(msg))
}

const handleQuery = (req, res, next, data) => results => {
  const {
    query,
    operationName,
    extensions: { persistedQuery: { sha256Hash } },
  } = data

  if (results != null)
    return sendQuery(req, next, { ...data, query: results })

  if (!query)
    return sendErrors(res, next, `Query hash not found: ${sha256Hash}`, [
      { message: 'PersistedQueryNotFound' },
    ])

  const errors = validate(schema, parse(query))

  if (errors.length)
    return sendErrors(
      res,
      next,
      `Invalid query provided with hash: ${query}`,
      errors
    )

  if (client.status !== 'ready') 
    return sendQuery(req, next, data)

  const cacheKey = `${PQ}:${operationName}:${sha256Hash}`

  client
    .set(cacheKey, query)
    .then(() => sendQuery(req, next, data))
    .catch(err => 
      sendErrors(res, next, `Redis set pq error: ${err}`, [err]))
}

const method = req => {
  const isPostRequest = req.method === 'POST'
  const data = isPostRequest ? 'body' : 'query'

  const {
    extensions = isPostRequest ? {} : '{}',
  } = req[data]

  return isPostRequest
    ? { ...req[data], extensions }
    : { ...req[data], extensions: JSON.parse(extensions) }
}

const persistedQueries = (req, res, next) => {
  const data = method(req)

  const {
    operationName,
    extensions: { persistedQuery: { sha256Hash } = {} },
  } = data

  if (!sha256Hash) return next()

  if (client.status !== 'ready') 
    return handleQuery(req, res, next, data)()

  const cacheKey = `${PQ}:${operationName}:${sha256Hash}`

  client
    .get(cacheKey)
    .then(handleQuery(req, res, next, data))
    .catch(err => 
      sendErrors(res, next, `Redis get pq error: ${err}`, [err]))
}

module.exports = persistedQueries
