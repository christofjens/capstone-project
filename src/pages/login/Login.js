import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { BASE_URL } from '../../helper/url'

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState()

  async function loginUser(credentials) {
    return fetch(BASE_URL + '/users/' + username + '/claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(data => data.json())
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const token = await loginUser({
      username,
    })
    setToken(token)
  }

  return (
    <LoginWrapper>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={username}
            onChange={e => setUserName(e.target.value)}
          />
        </label>
        <button disabled={!username} type="submit">
          Submit
        </button>
      </form>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.section`
  gap: 20px;
  padding: 20px;
`
