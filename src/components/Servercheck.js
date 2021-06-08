import { useState } from 'react'
import { BASE_URL } from '../consts/url'

export default function Servercheck() {
  const [serverStatus, setServerStatus] = useState([])

  fetch(BASE_URL + '/game/status')
    .then(res => res.json())
    .then(resBody => setServerStatus(resBody.status))
    .catch(err => console.error(err))

  return (
    <>
      The Server is currently{' '}
      {serverStatus === 'spacetraders is currently online and available to play'
        ? 'active'
        : 'not active'}
    </>
  )
}
