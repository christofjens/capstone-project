import axios from 'axios'
import { useState, useEffect } from 'react'
import { loadFromLocal } from '../helper/localStorage'

export default function useFetch(url, method) {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const { token } = loadFromLocal('token')

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        })
        setData(response.data)
      } catch (error) {
        if (error.response) {
          // console.log(error.response.data)
          setError(error.response.status)
          // console.log(error.response.headers)
        } else if (error.request) {
          setError(error.request)
        } else {
          setError('Error', error.message)
        }

        console.log(error)
      }
    })()
  }, [method, token, url])

  return { data, error }
}
