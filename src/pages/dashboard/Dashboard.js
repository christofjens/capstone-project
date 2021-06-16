import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { loadFromLocal, removeFromLocal } from '../../helper/localStorage'
import { BASE_URL } from '../../helper/url'

export default function Dashboard() {
  const { token } = loadFromLocal('token')
  const [userData, setUserData] = useState([])

  useEffect(() => {
    fetch(BASE_URL + '/my/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(resBody => setUserData(resBody.user))
      .catch(err => console.log(err))
  }, [token])

  return (
    <>
      <h2>Dashboard</h2>
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
