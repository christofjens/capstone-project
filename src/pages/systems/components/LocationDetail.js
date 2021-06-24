import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../helper/localStorage'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'

LocationDetail.propTypes = {
  allowsConstruction: PropTypes.bool,
  dockedShips: PropTypes.number,
  name: PropTypes.string,
  symbol: PropTypes.string,
  type: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default function LocationDetail() {
  const [locationDetail, setLocationDetail] = useState([])
  const { token } = loadFromLocal('token')

  //remove useEffect, not neccessary
  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.spacetraders.io/locations/OE-PM',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setLocationDetail(result.data.location)
    })()
  }, [])

  return (
    <div>
      <h3>
        Details for {locationDetail.type} {locationDetail.name}
      </h3>
      <LocationDetailList>
        <ul>
          <li>
            <strong key={locationDetail.symbol}>
              {locationDetail.name} / {locationDetail.symbol}
            </strong>
          </li>
          <li>
            {locationDetail.type}, Grid x: {locationDetail.x}/y:{' '}
            {locationDetail.y}
          </li>
          <li>
            {locationDetail.allowsConstruction === true
              ? 'Construction of buildings is allowed'
              : 'Construction of buildings is not allowed'}
          </li>
        </ul>
      </LocationDetailList>
    </div>
  )
}

const LocationDetailList = styled.ul`
  margin-top: 40px;
  li {
    list-style: none;
  }
`
