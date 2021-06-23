import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './pages/dashboard/Dashboard'
import Loans from './pages/loans/Loans'
import Splash from './pages/splash/Splash'
import useToken from './hooks/useToken'
import Systems from './pages/systems/Systems'

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
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/loans" component={Loans} />
          <Route exact path="/systems" component={Systems} />
        </Switch>
      </Router>
    </>
  )
}

export default App
