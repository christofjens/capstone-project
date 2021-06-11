import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { BASE_URL } from '../../helper/url'

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default function Register({ setToken }) {
  const [username, setUserName] = useState()
  const [error, setError] = useState('')

  async function registerUser(credentials) {
    return fetch(BASE_URL + '/users/' + username + '/claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(data => {
        if (!data.ok) {
          throw Error(
            'This username has already been claimed, try another one.'
          )
        } else {
          return data.json()
        }
      })
      .catch(err => setError(err.message))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const token = (await registerUser()) ?? error
    setToken(token)
  }

  return (
    <LoginWrapper>
      <h2>Register</h2>
      <p>If you're new to the game, please enter a username:</p>
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
        {error && <p>{error}</p>}
      </form>
    </LoginWrapper>
  )
}

const LoginWrapper = styled.section`
  gap: 20px;
  padding: 20px;
`
