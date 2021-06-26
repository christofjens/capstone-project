import MyShips from './components/MyShips'
import BuyShips from './components/BuyShips'
import styled from 'styled-components/macro'
import { useState } from 'react'

export default function Ships() {
  const [activeSection, setActiveSection] = useState('myShips')

  const handleMyNavigate = () => {
    setActiveSection('myShips')
  }

  const handleBuyNavigate = () => {
    setActiveSection('buyShips')
  }

  return (
    <Main>
      <InnerMain>
        <h2>Fleet</h2>
        {activeSection === 'myShips' ? <MyShips /> : <BuyShips />}
      </InnerMain>
      <InnerNavigation>
        <InnerNavigationButton onClick={() => handleMyNavigate()}>
          YOUR FLEET
        </InnerNavigationButton>
        {'/'}
        <InnerNavigationButton onClick={() => handleBuyNavigate()}>
          BUY NEW SHIP
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
  background: rgba(30, 30, 30, 1);
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 60px;
`

const InnerNavigationButton = styled.button`
  border: none;
  /* border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px 20px; */
  padding: 10px 20px;
  width: 45%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0);
  color: #eee;
`
