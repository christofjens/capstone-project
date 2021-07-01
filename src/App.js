import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import useToken from './hooks/useToken'
import Dashboard from './pages/dashboard/Dashboard'
import Loans from './pages/loans/Loans'
import Splash from './pages/splash/Splash'
import Ships from './pages/ships/Ships'
import Systems from './pages/systems/Systems'
import Navigation from './components/Navigation/Navigation'

export default function App() {
  const { token, setToken } = useToken()

  if (!token) {
    return <Splash setToken={setToken} />
  }

  return (
    <Router>
      <Switch>
        <AppContainer>
          {/* <Logo src={process.env.PUBLIC_URL + `/spacetraderslogo.png`} alt="" /> */}
          <ContentContainer>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/loans">
              <Loans />
            </Route>
            <Route path="/ships">
              <Ships />
            </Route>
            <Route exact path="/systems">
              <Systems />
            </Route>
          </ContentContainer>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </AppContainer>
      </Switch>
    </Router>
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
  padding: 20px 20px 100px 20px;
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
