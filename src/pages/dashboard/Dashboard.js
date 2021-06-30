import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { loadFromLocal, removeFromLocal } from '../../utils/localStorage'

export default function Dashboard() {
  const { token } = loadFromLocal('token')
  const [userData, setUserData] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await axios.get('https://api.spacetraders.io/my/account', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUserData(result.data.user)
    })()
  }, [])

  return (
    <>
      <Logo src={process.env.PUBLIC_URL + `/spacetraderslogo.png`} alt="" />
      <h2>
        <BlinkingSpan>_</BlinkingSpan>Dashboard
      </h2>
      <h3>_Account_Info</h3>
      <UserDataWrapper>
        <li>
          <Highlight>Hello, {userData.username}!</Highlight>
        </li>
        <li>
          Your token has been stored locally. To be completely sure you can log
          in to your game later, save it in a text file.
        </li>
        <li>
          <Highlight>Token:</Highlight> {token}
        </li>
        <li>
          <Highlight>Credits:</Highlight>{' '}
          {new Intl.NumberFormat('de-DE').format(userData.credits)}
        </li>
        <li>
          <Highlight>Ships:</Highlight> {userData.shipCount}
        </li>
        <li>
          <Highlight>Buildings:</Highlight> {userData.structureCount}
        </li>
      </UserDataWrapper>
      <form>
        <LogOutButton
          onClick={() => {
            removeFromLocal('token')
          }}
        >
          LOG OUT
        </LogOutButton>
      </form>
    </>
  )
}

const UserDataWrapper = styled.ul`
  padding: 30px 20px 20px 20px;
  border: none;
  list-style: none;
  li {
    margin-top: 10px;
  }
`
const LogOutButton = styled.button`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  width: 100%;
  font-family: 'Titillium Web', monospace;
  font-size: 1rem;
  font-weight: 400;
  color: #eee;
  background: transparent;
`
const Highlight = styled.span`
  font-weight: 400;
  color: rgba(255, 170, 0, 1);
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
const Logo = styled.image`
  width: 300px;
  height: 40px;
`
