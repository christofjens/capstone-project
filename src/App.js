import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'

import Dashboard from './pages/dashboard/Dashboard'
import Loans from './pages/loans/Loans'
import Splash from './pages/splash/Splash'
import Ships from './pages/ships/Ships'
import Systems from './pages/systems/Systems'
import useToken from './hooks/useToken'
import Navigation from './components/Navigation/Navigation'
import LocationDetail from './pages/systems/components/LocationDetail'

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
        {/* <Logo src={process.env.PUBLIC_URL + `/spacetraderslogo.png`} alt="" /> */}
        <ContentContainer>
          <Switch>
            <>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/loans">
                <Loans />
              </Route>
              <Route exact path="/ships">
                <Ships />
              </Route>
              <Route exact path="/systems">
                <Systems />
              </Route>
              <Route exact path="/locationdetail">
                <LocationDetail />
              </Route>
            </>
          </Switch>
        </ContentContainer>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
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
  position: relative;
`

const ContentContainer = styled.div`
  align-self: start;
  padding: 20px 20px 0 20px;
  overflow-y: scroll;
`

const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
`
// const Logo = styled.image`
//   width: 300px;
//   height: 40px;
// `
