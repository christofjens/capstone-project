import MyLoans from './components/MyLoans'
import GetLoans from './components/GetLoans'
import styled from 'styled-components/macro'
import { Route, NavLink } from 'react-router-dom'

export default function Loans() {
  return (
    <Main>
      <InnerMain>
        <h2>
          <BlinkingSpan>_</BlinkingSpan>Loans
        </h2>
        <Route exact path="/loans" component={MyLoans} />
        <Route exact path="/loans/get" component={GetLoans} />
      </InnerMain>
      <InnerNavigation>
        <InnerNavigationButton exact to="/loans">
          YOUR LOANS
        </InnerNavigationButton>
        {'/'}
        <InnerNavigationButton exact to="/loans/get">
          GET NEW LOAN
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
  width: 45%;
  text-decoration: none;
  text-align: center;
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
