import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../helper/localStorage'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'

SystemsOverview.propTypes = {
  cargo: PropTypes.array,
  flightPlanId: PropTypes.string,
  id: PropTypes.string,
  location: PropTypes.string,
  manufacturer: PropTypes.string,
  maxCargo: PropTypes.number,
  plating: PropTypes.number,
  spaceAvailable: PropTypes.number,
  speed: PropTypes.number,
  type: PropTypes.string,
  weapons: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  setSystemsOverview: PropTypes.func,
}

export default function SystemsOverview() {
  const [systemsOverview, setSystemsOverview] = useState([])
  const { token } = loadFromLocal('token')

  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.spacetraders.io/systems/OE/locations',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setSystemsOverview(result.data.locations)
    })()
  }, [])

  return (
    <div>
      <h2>Ships</h2>
      <h3>System</h3>
      {systemsOverview.map(
        ({ symbol, allowsConstruction, name, type, x, y }) => (
          <SystemsOverviewList>
            <ul>
              <li>
                <strong key={symbol}>
                  {name} / {symbol}
                </strong>
              </li>
              <li>
                {type}, Grid x: {x}/y: {y}
              </li>
              <li>
                {allowsConstruction === true
                  ? 'Construction of buildings is allowed'
                  : 'Construction of buildings is not allowed'}
              </li>
            </ul>
            <LocationDetailButton>
              Get {type} {name}'s details
            </LocationDetailButton>
          </SystemsOverviewList>
        )
      )}
    </div>
  )
}

const SystemsOverviewList = styled.ul`
  margin-top: 40px;
  li {
    list-style: none;
  }
`

const LocationDetailButton = styled.button`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 7px;
  padding: 7px;
  margin-top: 20px;
`
