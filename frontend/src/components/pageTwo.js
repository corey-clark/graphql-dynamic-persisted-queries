import React from 'react'
import { Query } from 'react-apollo'
import { extendGreeting } from '../queries'

const showExtendedGreeting = ({ error, loading, data: { greeting } = {} }) => {
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return (
    <p>
      My name is {greeting.name},
      and Im a {greeting.profession}
    </p>
  ) 
}

const PageTwo = () =>
  <Query query={extendGreeting} variables={{ name: 'Kyrie' }}>
    {showExtendedGreeting}
  </Query>

export default PageTwo
