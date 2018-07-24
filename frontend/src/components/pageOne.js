import React from 'react'
import { Query } from "react-apollo"
import { getGreeting } from '../queries'

const showGreeting = ({ error, loading, data: { greeting } = {} }) => {
  if (loading) return "Loading..."
  if (error) return `Error! ${error.message}`

  return <p>{greeting.name}, {greeting.text}</p>
}

const PageOne = () =>
  <Query query={getGreeting} variables={{ name: 'Cadence' }}>
    {showGreeting}
  </Query>

export default PageOne
