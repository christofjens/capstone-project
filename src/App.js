import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Systems from './pages/systems/Systems'
import useToken from './helper/useToken'

function App() {
  const { token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Wrapper>
      <h1>Space Traders</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/systems">
            <Systems />
          </Route>
        </Switch>
      </BrowserRouter>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 20px;
`

export default App
