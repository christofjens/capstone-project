import styled from 'styled-components'

export default function Button({ children }) {
  return <StdButton>{children}</StdButton>
}

const StdButton = styled.button`
  padding: 10px;
  background-color: #eee;
  color: #333;
  border: 1px solid #999;
  border-radius: 20px;
`
