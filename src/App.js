import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import styled from 'styled-components/macro'

import Dashboard from './pages/dashboard/Dashboard'
import Splash from './pages/splash/Splash'
import useToken from './hooks/useToken'

function App() {
  const { token, setToken } = useToken()

  if (!token) {
    return (
      <>
        <Splash setToken={setToken} />
      </>
    )
  }

  return (
    <>
      <h1>Space Traders</h1>
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
