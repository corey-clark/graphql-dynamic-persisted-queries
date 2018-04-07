import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Home from './components/home'
import PageOne from './components/pageOne'
import PageTwo from './components/pageTwo'

const client = new ApolloClient({ 
  cache: new InMemoryCache(),
  link: createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
    createHttpLink({ uri: 'http://localhost:4000/graphql' })
  )
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/pageone">Page One</Link></li>
          <li><Link to="/pagetwo">Page Two</Link></li>
        </ul>

        <hr />

        <Route path="/home" component={Home}/>
        <Route path="/pageone" component={PageOne}/>
        <Route path="/pagetwo" component={PageTwo}/>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
