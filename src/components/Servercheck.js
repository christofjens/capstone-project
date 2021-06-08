// import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useState } from 'react'

export default function Servercheck() {
  const checkUrl = 'https://api.spacetraders.io/game/status'
  const [serverStatus, setServerStatus] = useState([])

  fetch(checkUrl)
    .then(res => res.json())
    .then(resBody => setServerStatus(resBody.status))
    .catch(err => console.error(err))

  return (
    <Wrapper>
      The Server is currently{' '}
      {serverStatus === 'spacetraders is currently online and available to play'
        ? 'active'
        : 'not active'}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex: wrap;
  padding: 20px;
`
