const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const Redis = require('ioredis')
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')

const port = 4000
const app = express()
const cache = new Redis()
const connected = client.status === 'ready'
const persistedQueries = connected ? { persistedQueries: { cache } } : {}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  ...persistedQueries,
})

server.applyMiddleware({ app })

app.listen(port, () => console.log(`listening on port: ${port}`))
