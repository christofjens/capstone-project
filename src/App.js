import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Dashboard from './pages/dashboard/Dashboard'
import Loans from './pages/loans/Loans'
import Splash from './pages/splash/Splash'
import Ships from './pages/ships/Ships'
import useToken from './hooks/useToken'

function App() {
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
    <>
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
    </>
  )
}

export default App
