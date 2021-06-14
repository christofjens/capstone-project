import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { BASE_URL } from '../../helper/url'

Login.propTypes = {
  setToken: PropTypes.func,
}

export default function Login({ setToken }) {
  const [token, setExistingToken] = useState()
  const [error, setError] = useState('')

  async function loginUser() {
    return fetch(BASE_URL + '/my/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(data => {
        if (!data.ok) {
          throw Error('This token was wrong, try again.')
        } else {
          return {
            token: `${token}`,
          }
        }
      })
      .catch(err => setError(err.message))
  }
  console.log(token)
  const handleSubmit = async e => {
    e.preventDefault()
    const token = await loginUser()
    setToken(token)
  }

  return (
    <LoginWrapper>
      <h2>Log In</h2>
      <p>If you already have a token, please enter your token:</p>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            aria-label="login"
            type="text"
            value={token}
            onChange={e => setExistingToken(e.target.value)}
          />
        </label>
        <button disabled={!token} type="submit">
          Submit
        </button>
        {error && <p>{error}</p>}
      </form>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.section`
  gap: 20px;
  padding: 20px;
`
