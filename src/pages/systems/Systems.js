import styled from 'styled-components/macro'
import Systemsoverview from './components/Systemsoverview'
import LocationDetail from './components/LocationDetail'
import { useState } from 'react'
import PropTyes from 'prop-types'

Systems.propTypes = {
  symbol: PropTyes.string,
}

export default function Systems({ symbol }) {
  const [activeSection, setActiveSection] = useState('systemsOverview')

  const handleSystemsOverviewNavigate = () => {
    setActiveSection('systemsOverview')
  }

  const handleLocationDetailNavigate = () => {
    setActiveSection('locationDetail')
  }

  return (
    <Main>
      <h2>
        <BlinkingSpan>_</BlinkingSpan>Systems
      </h2>
      {activeSection === 'systemsOverview' ? (
        <Systemsoverview symbol={symbol} />
      ) : (
        <LocationDetail />
      )}
    </Main>
  )
}

const Main = styled.section`
  display: grid;
  grid-template-rows: auto 60px;
  position: relative;
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
