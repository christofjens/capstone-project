import React from 'react'
import { loadFromLocal } from '../../helper/localStorage'

export default function Dashboard() {
  const users = loadFromLocal('token')
  return (
    <>
      <h2>Dashboard</h2>
      <ul>
        <li>Username: {users.user.username}</li>
        <li>Token: {users.token}</li>
        <li>Delete Account: {users.token}</li>
      </ul>
    </>
  )
}
