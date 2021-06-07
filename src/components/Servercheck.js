// import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useState, useEffect } from 'react'

export default function Servercheck() {
  const checkUrl = 'https://api.spacetraders.io/game/status'
  const [serverStatus, setServerStatus] = useState([])

  useEffect(() => {
    const fetchCheckUrl = () => {
      fetch(checkUrl)
        .then(res => res.json())
        .then(resBody => setServerStatus([resBody.status]))
        .catch(err => console.error(err))
    }

    const timer = setTimeout(() => {
      fetchCheckUrl()
    }, 1000)

    return () => clearTimeout(timer)
  })

  return <Wrapper>{serverStatus}</Wrapper>
}

const Wrapper = styled.section`
  display: flex;
  flex: wrap;
  padding: 20px;
`
