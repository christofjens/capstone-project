import styled from 'styled-components'
import { ReactComponent as HomeIcon } from '../../assets/icons/home-outline.svg'
import { ReactComponent as RocketIcon } from '../../assets/icons/rocket-outline.svg'
import { ReactComponent as PlanetIcon } from '../../assets/icons/planet-outline.svg'
import { ReactComponent as CashIcon } from '../../assets/icons/cash-outline.svg'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <NavigationContainer>
      <NavButton exact to="/" activeClassName="active">
        <HomeIcon />
      </NavButton>
      <NavButton exact to="/ships" activeClassName="active">
        <RocketIcon />
      </NavButton>
      <NavButton exact to="/systems" activeClassName="active">
        <PlanetIcon />
      </NavButton>
      <NavButton exact to="/loans" activeClassName="active">
        <CashIcon />
      </NavButton>
    </NavigationContainer>
  )
}

const NavigationContainer = styled.nav`
  width: 100vw;
  max-width: 600px;
  height: 48px;
  margin: 0 auto;
  background: #000;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const NavButton = styled(NavLink)`
  border: none;
  padding: auto 20px;
  width: 24px;
  height: 24px;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 400;
  background: #000;
  color: #eee;

  &.active {
    color: orange;
  }
`
