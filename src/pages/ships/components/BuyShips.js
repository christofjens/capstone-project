import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../helper/localStorage'
import styled from 'styled-components/macro'
import axios from 'axios'
import PropTypes from 'prop-types'

BuyShips.propTypes = {
  manufacturer: PropTypes.string,
  maxCargo: PropTypes.number,
  plating: PropTypes.number,
  speed: PropTypes.number,
  weapons: PropTypes.number,
  type: PropTypes.string,
  purchaseLocations: PropTypes.arrayOf(
    PropTypes.shape({
      location: PropTypes.string,
      price: PropTypes.number,
      system: PropTypes.string,
    })
  ),
  setBuyShips: PropTypes.func,
}

export default function BuyShips() {
  const [buyShips, setBuyShips] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { token } = loadFromLocal('token')

  console.log(buyShips)

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
      setSuccess(`${type} ship added to your fleet!`)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
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
            <ShipListContainer>
              <ul>
                <li>
                  <ImportantSpan key={type}>
                    {manufacturer} {type}
                  </ImportantSpan>
                </li>
                <li>Cargo: {maxCargo}</li>
                <li>Speed: {speed}</li>
                <li>Plating: {plating}</li>
                <li>Weapons: {weapons}</li>
              </ul>
              <Image>
                <img
                  src={process.env.PUBLIC_URL + `/shipId_${type}.png`}
                  alt=""
                />
              </Image>
            </ShipListContainer>
            {purchaseLocations.map(({ location, price, system }) => (
              <SubSection>
                <ul>
                  <li>Available at {location} </li>
                  <li>for {price} Credits</li>
                </ul>
                <div>
                  <BuyButton onClick={() => handleBuyShip(type, location)}>
                    BUY
                  </BuyButton>
                </div>
                {success && <SuccessMessage>{success}</SuccessMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </SubSection>
            ))}
          </ShipList>
        )
      )}
    </div>
  )
}

const ImportantSpan = styled.span`
  font-weight: 400;
  color: rgba(255, 120, 0, 0.9);
`

const ShipList = styled.div`
  padding: 20px 0 0 0;
  border: none;
  li {
    list-style: none;
  }
`

const ShipListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
  border: 0;
`

const Image = styled.div`
  height: 150px;
  width: 150px;
`
const SubSection = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px 20px;
  border: none;
`
const BuyButton = styled.button`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 400;
  background: transparent;
  color: #eee;
`

const ErrorMessage = styled.div`
  color: crimson;
  font-weight: bold;
  margin-top: 15px;
`
const SuccessMessage = styled.div`
  color: white;
  font-weight: 400;
  margin-top: 15px;
`
