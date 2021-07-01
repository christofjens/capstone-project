import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Servercheck() {
  const [serverStatus, setServerStatus] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await axios.get('https://api.spacetraders.io/game/status')
      setServerStatus(result.data.status)
    })()
  }, [])

  return (
    <Wrapper>
      The Server is currently{' '}
      {serverStatus === 'spacetraders is currently online and available to play'
        ? 'active 🟢'
        : 'not active 🔴'}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 40px 20px 0 20px;
  text-align: center;
`
