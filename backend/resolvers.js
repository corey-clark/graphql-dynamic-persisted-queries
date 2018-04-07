const resolvers = {
  Query: {
    greeting: (_, { name }) => ({ 
      name,
      age: 99,
      profession: 'Software Engineer',
      text: 'How are you today?'
    })
  }
}

module.exports = resolvers
