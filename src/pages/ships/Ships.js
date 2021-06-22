import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../helper/localStorage'
import styled from 'styled-components'
import axios from 'axios'

export default function Ships() {
  const [error, setError] = useState('')
  const [buyShips, setBuyShips] = useState([])
  const { token } = loadFromLocal('token')

  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.spacetraders.io/systems/OE/ship-listings',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setBuyShips(result.data.shipListings)
    })()
  }, [])

  function handleBuyShip(type, location) {
    try {
      axios({
        method: 'post',
        url: 'https://api.spacetraders.io/my/ships',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { type: `${type}`, location: `${location}` },
      })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h2>Ships</h2>
      <h3>Buy New Ships</h3>
      {buyShips.map(
        ({
          manufacturer,
          maxCargo,
          plating,
          speed,
          weapons,
          type,
          purchaseLocations,
        }) => (
          <ShipList>
            <ul>
              <li>
                {manufacturer} {type}
              </li>
              <li>Cargo: {maxCargo}</li>
              <li>Speed: {speed}</li>
              <li>Plating: {plating}</li>
              <li>Weapons: {weapons}</li>
              {purchaseLocations.map(({ location, price, system }) => (
                <SubSection>
                  <li>
                    Location: {location}, {system} System
                  </li>
                  <li>Price: {price}</li>
                  <BuyButton onClick={() => handleBuyShip(type, location)}>
                    Buy a {type} ship
                  </BuyButton>
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </SubSection>
              ))}
            </ul>
          </ShipList>
        )
      )}
    </div>
  )
}

const ShipList = styled.ul`
  margin-top: 40px;
  li {
    list-style: none;
  }
`
const SubSection = styled.ul`
  margin: 20px 0 0 20px;
`
const BuyButton = styled.button`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 7px;
  padding: 7px;
  margin-left: -20px;
  margin-top: 20px;
`

const ErrorMessage = styled.div`
  color: crimson;
  font-weight: bold;
  margin-top: 15px;
`
