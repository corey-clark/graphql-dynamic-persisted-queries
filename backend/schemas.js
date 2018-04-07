const Greeting = `
  type Greeting {
    name: String
    age: Int
    profession: String
    text: String
  }
`

const Query = `
  type Query {
    greeting(name: String): Greeting
  }
`

module.exports = [Greeting, Query]
