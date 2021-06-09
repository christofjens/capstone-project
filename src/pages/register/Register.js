import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BASE_URL } from '../../helper/url'

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default function Register({ setToken }) {
  const [username, setUserName] = useState()
  const [submitToken, setSubmitToken] = useState()

  async function registerUser(credentials) {
    return fetch(BASE_URL + '/users/' + username + '/claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(data => data.json())
      .then(err => console.log(err))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const token = await registerUser({
      username,
      submitToken,
    })
    setToken(token)
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="text" onChange={e => setSubmitToken(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          <button type="submit"></button>
        </div>
      </form>
    </div>
  )
}
