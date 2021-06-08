import styled from 'styled-components/macro'
import Button from './Button'
import PropTypes from 'prop-types'

UserLogin.propTypes = {
  token: PropTypes.string,
}

export default function UserLogin() {
  return (
    <>
      <Form>
        <h2>Login</h2>
        <label aria-label="token">Enter your Token:</label>
        <input type="text"></input>
        <Button>Login</Button>
      </Form>
      <Error>
        <h2>Error</h2>
        Oops, that token was incorrect. Try again, or register as a new user.
      </Error>
    </>
  )
}

const Form = styled.form`
  display: grid;
  gap: 20px;
`

const Error = styled.section`
  display: grid;
  gap: 20;
`
