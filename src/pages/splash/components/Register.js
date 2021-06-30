import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'

Register.propTypes = {
  setToken: PropTypes.func,
}

export default function Register({ setToken }) {
  const [error, setError] = useState('')
  const [username, setUsername] = useState()

  async function registerUser() {
    try {
      const response = await axios.post(
        'https://api.spacetraders.io/users/' + username + '/claim'
      )
      const data = response.data
      return data
    } catch (error) {
      setError(error.message)
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const token = (await registerUser()) ?? error
    setToken(token)
  }

  return (
    <>
      <P>
        <ImportantSpan>To register a new account,</ImportantSpan>
        <br />
        please enter a username:
      </P>
      <form onSubmit={handleSubmit}>
        <label>
          <Input
            type="text"
            value={username}
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <Button disabled={!username} type="submit">
          REGISTER
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </>
  )
}

const Input = styled.input`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  color: #eee;
  min-width: 100%;
  text-align: center;
`
const Button = styled.button`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  width: 100%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 500;
  background: transparent;
  color: #eee;
`
const P = styled.p`
  margin-top: 80px;
  padding: 0 20px;
`

const ImportantSpan = styled.span`
  color: rgba(255, 170, 0, 1);
  font-weight: bold;
  margin-top: 10px;
`
const ErrorMessage = styled.div`
  color: rgba(255, 170, 0, 1);
  font-weight: bold;
  margin-top: 15px;
`
