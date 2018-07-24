const { gql } = require('apollo-server-express')

const Greeting = gql`
  type Greeting {
    name: String
    age: Int
    profession: String
    text: String
  }
`

const Query = gql`
  type Query {
    greeting(name: String): Greeting
  }
`

module.exports = [Greeting, Query]
