import MyShips from './components/MyShips'
import BuyShips from './components/BuyShips'
import styled from 'styled-components/macro'
import { Route, NavLink } from 'react-router-dom'

export default function Ships() {
  return (
    <Main>
      <InnerMain>
        <h2>
          <BlinkingSpan>_</BlinkingSpan>Fleet
        </h2>
        <Route exact path="/ships" component={MyShips} />
        <Route exact path="/ships/buy" component={BuyShips} />
      </InnerMain>
      <InnerNavigation>
        <InnerNavigationButton exact to="/ships">
          YOUR FLEET
        </InnerNavigationButton>
        {'/'}
        <InnerNavigationButton exact to="/ships/buy">
          ADD NEW SHIP
        </InnerNavigationButton>
      </InnerNavigation>
    </Main>
  )
}

const Main = styled.section`
  display: grid;
  grid-template-rows: auto 60px;
  position: relative;
`

const InnerMain = styled.div`
  overflow-y: scroll;
`

const InnerNavigation = styled.div`
  width: 100%;
  max-width: 600px;
  height: 60px;
  margin: 0 0 0 -20px;
  background: rgba(0, 18, 30, 1);
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 60px;
`

const InnerNavigationButton = styled(NavLink)`
  border: none;
  padding: 10px 20px;
  text-decoration: none;
  text-align: center;
  width: 45%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 500;
  background-color: transparent;
  color: #eee;

  &.active {
    color: rgba(255, 170, 0, 1);
  }
`

const BlinkingSpan = styled.span`
  animation: blinkingText 1.2s infinite;
  @keyframes blinkingText {
    0% {
      color: #fff;
    }
    49% {
      color: #fff;
    }
    50% {
      color: transparent;
    }
    99% {
      color: transparent;
    }
    100% {
      color: #fff;
    }
  }
`
