import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { loadFromLocal, removeFromLocal } from '../../helper/localStorage'

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
      <h2>Dashboard</h2>
      <UserDataWrapper>
        <li>
          <Highlight>Hello, {userData.username}!</Highlight>
        </li>
        <li>
          <Highlight>Token:</Highlight>
          {token}
        </li>
        <li>
          Your token has been saved in the app. To be completely sure you can
          log in to your game later, save it in a text file.
        </li>
        <li>
          <Highlight>Credits:</Highlight> {userData.credits}
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
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-between; */
  padding: 20px;
  margin-top: 40px;
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
  padding: 15px;
  width: 100%;
  font-family: 'Titillium Web', monospace;
  font-size: 1rem;
  font-weight: 400;
  color: #eee;
  background-color: transparent;
`
const Highlight = styled.span`
  font-weight: 400;
`
const Important = styled.span`
  color: rgba(255, 120, 0, 0.9);
  font-weight: 400;
`
