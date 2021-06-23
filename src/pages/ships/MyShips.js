import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../helper/localStorage'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'

Myships.propTypes = {
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
  myShips: PropTypes.func,
}

export default function Myships() {
  const [myShips, setMyShips] = useState([])
  const { token } = loadFromLocal('token')

  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.spacetraders.io/my/ships',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setMyShips(result.data.ships)
    })()
  }, [])

  return (
    <div>
      <h2>Ships</h2>
      <h3>Your Current Ships</h3>
      {myShips.map(
        ({
          flightPlanId,
          cargo,
          id,
          location,
          manufacturer,
          maxCargo,
          plating,
          spaceAvailable,
          speed,
          type,
          weapons,
          x,
          y,
        }) => (
          <MyShipsList>
            <ul>
              <li>
                <strong key={id}>
                  {manufacturer} {type}
                </strong>
              </li>
              <li>
                Current Location: {location} (x: {x} | y: {y})
              </li>
              <li>
                Cargo: {spaceAvailable} of {maxCargo}
              </li>
              <li>
                Speed: {speed} / Plating: {plating} / Weapons: {weapons}
              </li>
            </ul>
            <ShipButton>Go to Ship</ShipButton>
          </MyShipsList>
        )
      )}
    </div>
  )
}

const MyShipsList = styled.ul`
  margin-top: 40px;
  li {
    list-style: none;
  }
`

const ShipButton = styled.button`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 7px;
  padding: 7px;
  margin-top: 20px;
`
