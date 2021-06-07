import styled from 'styled-components/macro'

export default function Login() {
  return (
    <Form>
      <label aria-label="userName">userName</label>
      <input type="text"></input>
      <label aria-label="token">token</label>
      <input type="text"></input>
      <button>button</button>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  gap: 20px;
`
