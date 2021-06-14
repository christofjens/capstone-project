import React, { useEffect, useState } from 'react'
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
  }, [])

  return (
    <>
      <h2>Dashboard</h2>
      <ul>
        <li>Username: {userData.username}</li>
        <li>Token: {token}</li>
        <li>Credits: {userData.credits}</li>
        <li>Ships: {userData.shipCount}</li>
        <li>Buildings: {userData.structureCount}</li>
      </ul>
      <form>
        <button
          onClick={() => {
            removeFromLocal('token')
          }}
        >
          Log Out!
        </button>
      </form>
    </>
  )
}
