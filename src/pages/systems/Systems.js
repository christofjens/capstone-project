import styled from 'styled-components/macro'
import SystemsOverview from './components/Systemsoverview'

export default function Systems() {
  return (
    <div>
      <h2>
        <BlinkingSpan>_</BlinkingSpan>Systems
      </h2>
      <SystemsOverview />
    </div>
  )
}

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
