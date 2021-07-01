import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'

Login.propTypes = {
  setToken: PropTypes.func,
}

export default function Login({ setToken }) {
  const [token, setExistingToken] = useState()
  const [error, setError] = useState('')

  async function loginUser() {
    try {
      await axios.get('https://api.spacetraders.io/my/account', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return { token: `${token}` }
    } catch (error) {
      setError(error.message)
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const token = (await loginUser()) ?? error
    setToken(token)
  }

  return (
    <>
      <P>
        <ImportantSpan>To log in to your account,</ImportantSpan>
        <br />
        please enter your token:
      </P>
      <form onSubmit={handleSubmit}>
        <label>
          <Input
            aria-label="login"
            type="text"
            value={token}
            placeholder="eg. 1234-5678-..."
            onChange={e => setExistingToken(e.target.value)}
          />
        </label>
        <Button disabled={!token} type="submit">
          LOGIN
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
  color: #fff;
  min-width: 100%;
  text-align: center;
`
const Button = styled.button`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  width: 100%;
  background: transparent;
  color: #fff;
`
const P = styled.p`
  margin-top: 80px;
  padding: 0 20px;
`

const ImportantSpan = styled.span`
  color: rgba(255, 170, 0, 1);
`
const ErrorMessage = styled.div`
  color: rgba(255, 170, 0, 1);
  margin-top: 15px;
`
