import React, { useEffect, useState } from 'react'
import { loadFromLocal, removeFromLocal } from '../../helper/localStorage'
import { BASE_URL } from '../../helper/url'

export default function Dashboard() {
  const { token } = loadFromLocal('token')
  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetch(BASE_URL + '/my/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(resBody => setUserData(resBody))
      .catch(err => console.log(err))
  })

  /////////////////

  console.log(token)
  console.log(BASE_URL + '/my/account', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(userData)

  /////////////////

  return (
    <>
      <h2>Dashboard</h2>
      <ul>
        <li>Username: {userData}</li>
        <li>Token: </li>
        <li>Credits: </li>
        <li>Loans: </li>
        <li>Ships: </li>
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
