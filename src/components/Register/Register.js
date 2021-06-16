import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { BASE_URL } from '../../helper/url'

Register.propTypes = {
  setToken: PropTypes.func,
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

  console.log(error)

  return (
    <>
      <P>
        <Important>To register a new account</Important>, please enter a
        username:
      </P>
      <form onSubmit={handleSubmit}>
        <label>
          <Input
            type="text"
            value={username}
            onChange={e => setUserName(e.target.value)}
          />
        </label>
        <Button disabled={!username} type="submit">
          Submit
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </>
  )
}

const Input = styled.input`
  margin-top: 20px;
  background-color: #fff;
  border: 2px solid #666;
  border-radius: 7px 0 0 7px;
  /* box-shadow: 0 0 20px #ff184c; */
  padding: 10px;
  color: #666;
  min-width: 75%;
`
const Button = styled.button`
  margin-top: 20px;
  background-color: #fff;
  border: 2px solid #666;
  border-radius: 0 7px 7px 0;
  /* box-shadow: 0 0 20px #ff184c; */
  padding: 10px;
  color: #666;
  min-width: 80px;
`
const P = styled.p`
  margin-top: 80px;
`

const Important = styled.span`
  color: crimson;
  font-weight: bold;
  margin-top: 10px;
`
const ErrorMessage = styled.div`
  color: crimson;
  font-weight: bold;
  margin-top: 15px;
`
