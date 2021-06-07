import styled from 'styled-components/macro'
import Button from './Button'

export default function LoginUser() {
  // const newUserUrl =
  //   'https://api.spacetraders.io/users/' +
  //   document.getElementsByName('username').value +
  //   '/claim'

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
        <p>The user name you have entered is already taken. Try again!</p>
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
