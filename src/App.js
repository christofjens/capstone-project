import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import Dashboard from './pages/dashboard/Dashboard'
import Loans from './pages/loans/Loans'
import Splash from './pages/splash/Splash'
import Ships from './pages/ships/Ships'
import useToken from './hooks/useToken'
import Navigation from './components/Navigation/Navigation'

export default function App() {
  const { token, setToken } = useToken()
  const routes = [
    { path: '/', Component: Dashboard, exact: true },
    { path: '/loans', Component: Loans },
    { path: '/ships', Component: Ships },
  ]

  if (!token) {
    return (
      <>
        <Splash setToken={setToken} />
      </>
    )
  }

  return (
    <AppContainer>
      <ContentContainer>
        <h1>Space Traders</h1>
        <Router>
          <Switch>
            <>
              {routes.map(({ Component, ...routeProps }) => (
                <Route key={routeProps.path} {...routeProps}>
                  <Component />
                </Route>
              ))}
            </>
          </Switch>
        </Router>
      </ContentContainer>
      <Navigation />
    </AppContainer>
  )
}

const AppContainer = styled.section`
  align-items: end;
  height: 100vh;
  max-width: 600px;
  margin: 0;
  display: grid;
  grid-template-rows: auto 48px;
`

const ContentContainer = styled.section`
  align-self: start;
  padding: 20px 20px 0 20px;
`
