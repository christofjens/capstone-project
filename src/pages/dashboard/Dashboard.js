import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Servercheck from '../../components/Servercheck/Servercheck'
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
      <Servercheck />
      <UserDataWrapper>
        <li>
          <Highlight>Username:</Highlight> {userData.username}
        </li>
        <li>
          <Highlight>Token:</Highlight> <Important>{token}</Important>
          <br />
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
          Log Out!
        </LogOutButton>
      </form>
    </>
  )
}

const UserDataWrapper = styled.ul`
  border: 2px solid #666;
  border-radius: 7px;
  /* box-shadow: 0 0 20px #0a9cf5; */
  background-color: #fff;
  padding: 0 10px 10px 10px;
  margin-top: 80px;
  list-style: none;
  li {
    margin-top: 10px;
  }
`
const LogOutButton = styled.button`
  margin-top: 20px;
  background-color: #fff;
  border: 2px solid #ff184c;
  border-radius: 7px;
  /* box-shadow: 0 0 20px #ff184c; */
  padding: 10px;
  color: #ff184c;
  width: 100%;
`
const Highlight = styled.span`
  color: darkgreen;
`
const Important = styled.span`
  color: crimson;
  font-weight: bold;
`
