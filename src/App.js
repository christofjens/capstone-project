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

  if (!token) {
    return (
      <>
        <Splash setToken={setToken} />
      </>
    )
  }

  return (
    <AppContainer>
      <Router>
        <ContentContainer>
          <h1>Space Traders</h1>
          <Switch>
            <>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/loans">
                <Loans />
              </Route>
            </>
          </Switch>
        </ContentContainer>
        <Navigation />
      </Router>
    </AppContainer>
  )
}

const AppContainer = styled.section`
  align-items: end;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 48px;
`

const ContentContainer = styled.div`
  align-self: start;
  padding: 20px 20px 0 20px;
  overflow-y: scroll;
`
