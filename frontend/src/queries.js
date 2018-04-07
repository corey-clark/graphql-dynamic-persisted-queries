import gql from 'graphql-tag'

const getGreeting = gql`
  query Greeting($name: String) {
    greeting(name: $name) {
      name
      text
    }
  }
`

const extendGreeting = gql`
  query Greeting($name: String) {
    greeting(name: $name) {
      name
      age
      profession
      text
    }
  }
`

export {
  getGreeting,
  extendGreeting
}
