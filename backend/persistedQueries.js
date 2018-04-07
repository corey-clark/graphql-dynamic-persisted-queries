const { omit } = require('ramda')
const queryMap = require('./extracted_queries.js')

const persistedQueries = (req, res, next) => {
  const { hash = '' } = req.query
  
  if (!hash) return next()
  const query = queryMap[hash]
  
  if (!query) {
    res.status(400).json({ error: [{}] })
    return next(new Error('Invalid query hash'))
  }

  req.query = {
    query,
    variables: omit(['hash'], req.query)
  }

  next()
}

module.exports = persistedQueries
