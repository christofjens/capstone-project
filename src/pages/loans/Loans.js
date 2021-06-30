import styled from 'styled-components/macro'
import Showloans from './components/Showloans'
import Myloans from './components/Myloans'
import { useState } from 'react'

export default function Loans() {
  const [activeSection, setActiveSection] = useState('myLoans')

  const handleMyLoansNavigate = () => {
    setActiveSection('myLoans')
  }

  const handleShowLoansNavigate = () => {
    setActiveSection('showLoans')
  }

  return (
    <Main>
      <InnerMain>
        <h2>
          <BlinkingSpan>_</BlinkingSpan>Loans
        </h2>
        {activeSection === 'myLoans' ? <Myloans /> : <Showloans />}
      </InnerMain>
      <InnerNavigation>
        <InnerNavigationButton onClick={() => handleMyLoansNavigate()}>
          YOUR LOANS
        </InnerNavigationButton>
        {'/'}
        <InnerNavigationButton onClick={() => handleShowLoansNavigate()}>
          TAKE NEW LOAN
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

const InnerNavigationButton = styled.button`
  border: none;
  /* border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px 20px; */
  padding: 10px 20px;
  width: 45%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0);
  color: #eee;
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
