import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../helper/localStorage'
import styled from 'styled-components/macro'
import axios from 'axios'
import PropTypes from 'prop-types'

MyShips.propTypes = {
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
  setMyShips: PropTypes.func,
}

export default function MyShips() {
  const [myShips, setMyShips] = useState([])
  const { token } = loadFromLocal('token')

  console.log(myShips)

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
          <div>
            <MyShipsList>
              <MyShipsListContainer>
                <ul>
                  <li>
                    <ImportantSpan key={type}>{manufacturer}</ImportantSpan>
                  </li>
                  <li>
                    <ImportantSpan>{type}</ImportantSpan>
                  </li>
                  <li>
                    Cargo: {spaceAvailable} of {maxCargo}
                  </li>
                  <li>Speed: {speed}</li>
                  <li>Plating: {plating}</li>
                  <li>Weapons: {weapons}</li>
                  <li>Location: {location}</li>
                </ul>
                <Image>
                  <img
                    src={process.env.PUBLIC_URL + `/shipId_${type}.png`}
                    alt=""
                  />
                </Image>
              </MyShipsListContainer>
            </MyShipsList>
            <ShipNavigation>
              <ShipNavigationButton>TRAVEL</ShipNavigationButton>
              <ShipNavigationButton>TRADE</ShipNavigationButton>
            </ShipNavigation>
          </div>
        )
      )}
    </div>
  )
}

const ImportantSpan = styled.span`
  font-weight: 200;
  color: rgba(255, 120, 0, 0.9);
`

const MyShipsList = styled.ul`
  padding: 20px 0 0 20px;
  margin-top: 20px;
  border-left: 1px dashed rgba(255, 255, 255, 0.2);
  border-right: 1px dashed rgba(255, 255, 255, 0.2);
  li {
    list-style: none;
  }
`

const MyShipsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 20px;
`

const Image = styled.div`
  height: 150px;
  width: 150px;
`

const ShipNavigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ShipNavigationButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0 0 20px 20px;
  padding: 10px 20px;
  width: 45%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0.1);
  color: #eee;
`
