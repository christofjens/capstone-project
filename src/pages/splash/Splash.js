import Login from './components/Login'
import Register from './components/Register'
import Servercheck from './components/Servercheck'
import styled from 'styled-components'

export default function Splash({ setToken }) {
  return (
    <AppContainer>
      <ContentContainer>
        <h2>
          <BlinkingSpan>_</BlinkingSpan>Space_traders
        </h2>
        <h3>_REGISTER_OR_LOGIN</h3>
        <Register setToken={setToken} />
        <Login setToken={setToken} />
        <Servercheck />
      </ContentContainer>
    </AppContainer>
  )
}

const AppContainer = styled.section`
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
`

const ContentContainer = styled.div`
  padding: 20px 20px 0 20px;
  overflow-y: scroll;
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
