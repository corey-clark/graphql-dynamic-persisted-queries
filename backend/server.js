const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const playground = require('graphql-playground-middleware-express').default
const persistedQueries = require('./persistedQueries')
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')
const cors = require('cors')

const port = 4000
const app = express()
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(
  '/graphql', 
  cors(),
  bodyParser.json(),
  persistedQueries,
  graphqlExpress({ schema })
)

app.use(
  '/playground', 
  playground({ endpointUrl: '/graphql' })
)

app.listen(port, () => console.log(`listening on port: ${port}`))

