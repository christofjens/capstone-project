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
        <Important>To log in to your account</Important>, please enter your
        token:
      </P>
      <form onSubmit={handleSubmit}>
        <label>
          <Input
            aria-label="login"
            type="text"
            value={token}
            onChange={e => setExistingToken(e.target.value)}
          />
        </label>
        <Button disabled={!token} type="submit">
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
`
const ErrorMessage = styled.div`
  color: crimson;
  font-weight: bold;
  margin-top: 15px;
`
