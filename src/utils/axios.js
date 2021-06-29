import { loadFromLocal } from '../helper/localStorage'
import axios from 'axios'

export default function instance() {
  const token = loadFromLocal('token')

  const instance = axios.create({
    baseURL: 'https://api.spacetraders.io',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return instance
}
