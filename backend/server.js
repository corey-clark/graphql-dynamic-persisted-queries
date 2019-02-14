const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')

const port = 4000
const app = express()

app.post('/hello', (req, res) => res.send('hello friend'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

app.listen(port, () => console.log(`listening on port: ${port}`))
