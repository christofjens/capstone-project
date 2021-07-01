import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../utils/localStorage'
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
      setSuccess(`1 ${type} ship added to your fleet!`)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h3>_Add_New_Ship</h3>
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
                <li>Max. cargo: {maxCargo}</li>
                <li>
                  Speed: {speed} / Plating: {plating} / Weapons: {weapons}
                </li>
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
                  <li>
                    for {new Intl.NumberFormat('de-DE').format(price)} Credits
                  </li>
                </ul>
                <div>
                  <BuyButton onClick={() => handleBuyShip(type, location)}>
                    BUY
                  </BuyButton>
                </div>
              </SubSection>
            ))}
            <Messages>
              {success && <SuccessMessage>{success}</SuccessMessage>}
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </Messages>
          </ShipList>
        )
      )}
    </div>
  )
}

const ImportantSpan = styled.span`
  color: rgba(255, 170, 0, 1);
`

const ShipList = styled.div`
  padding: 20px 0 0 0;
  border: none;
  li {
    list-style: none;
  }
`

const ShipListContainer = styled.div`
  padding: 20px 20px 0 20px;
  border: 0;
`

const Image = styled.div`
  padding: 20px 0;
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
  background: transparent;
  color: #fff;
`

const ErrorMessage = styled.div`
  color: crimson;
  font-weight: bold;
  margin-top: 15px;
`
const SuccessMessage = styled.div`
  color: rgba(0, 250, 0, 1);
  margin-top: 15px;
`
const Messages = styled.div`
  padding: 0 20px;
`
