import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './pages/dashboard/Dashboard'
import Loans from './pages/loans/Loans'
import Splash from './pages/splash/Splash'
import Ships from './pages/ships/Ships'
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
          <Route exact path="/loans" component={Loans} />
          <Route exact path="/ships" component={Ships} />
        </Switch>
      </Router>
    </>
  )
}

export default App
