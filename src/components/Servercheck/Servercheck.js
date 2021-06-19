import axios from 'axios'
import { useEffect, useState } from 'react'
// import { BASE_URL } from '../consts/url'

export default function Servercheck() {
  const [serverStatus, setServerStatus] = useState([])

  useEffect(() => {
    axios
      .get('https://api.spacetraders.io/game/status')
      .then(res => setServerStatus(res.data))
      .catch(err => console.log(err))
  }, [setServerStatus])

  console.log(serverStatus)

  return (
    <>
      The Server is currently{' '}
      {serverStatus.status ===
      'spacetraders is currently online and available to play'
        ? 'active'
        : 'not active'}
    </>
  )
}
