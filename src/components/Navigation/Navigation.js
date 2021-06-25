import styled from 'styled-components'

export default function Navigation() {
  return (
    <NavigationContainer>
      <Button>Home</Button>
      <Button>Ships</Button>
      <Button>System</Button>
      <Button>Bank</Button>
    </NavigationContainer>
  )
}

const NavigationContainer = styled.nav`
  width: 100vw;
  height: 48px;
`
const Button = styled.button`
  width: 25%;
  height: 48px;
`
