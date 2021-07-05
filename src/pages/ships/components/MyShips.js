import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../utils/localStorage'
import styled from 'styled-components/macro'
import axios from 'axios'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

MyShips.propTypes = {
  cargo: PropTypes.array,
  flightPlanId: PropTypes.string,
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
  shipId: PropTypes.shape({
    shipId: PropTypes.string,
  }),
}

export default function MyShips() {
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
  }, [token])

  if (!myShips.length) {
    return (
      <div>
        <h3>_Your_Ships</h3>
        <MyShipsList>
          <MyShipsListContainer>
            <ul>
              <li>
                <ImportantSpan>No ships.</ImportantSpan>
              </li>
              <li>
                You have no ships yet. To purchase your first ship click on ADD
                NEW SHIP
              </li>
            </ul>
          </MyShipsListContainer>
        </MyShipsList>
      </div>
    )
  }

  return (
    <div>
      <h3>_Your_Ships</h3>
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
          <div key={id}>
            <MyShipsList>
              <MyShipsListContainer>
                <ul>
                  <li>
                    <ImportantSpan key={type}>
                      {manufacturer} {type}
                    </ImportantSpan>
                  </li>
                  <li>
                    Cargo space available: {spaceAvailable} of {maxCargo}
                  </li>
                  <li>
                    Speed: {speed} / Plating: {plating} / Weapons: {weapons}
                  </li>
                  <li>Location: {!location ? 'in transit' : location}</li>
                </ul>
              </MyShipsListContainer>
              <Image>
                <img
                  src={process.env.PUBLIC_URL + `/shipId_${type}.png`}
                  alt=""
                />
              </Image>
              <ShipNavigation>
                <ShipNavigationButton
                  to={{
                    pathname: '/ships/travel',
                    state: { shipId: { id }, shipType: { type } },
                  }}
                >
                  TRAVEL
                </ShipNavigationButton>
                {'/'}
                <ShipNavigationButton
                  to={{
                    pathname: '/ships/trade',
                    state: { shipId: { id }, location: { location } },
                  }}
                >
                  TRADE
                </ShipNavigationButton>
              </ShipNavigation>
            </MyShipsList>
          </div>
        )
      )}
    </div>
  )
}

const ImportantSpan = styled.span`
  color: rgba(255, 170, 0, 1);
`

const MyShipsList = styled.ul`
  margin-top: 20px;
  border: none;
  li {
    list-style: none;
  }
`

const MyShipsListContainer = styled.div`
  padding: 20px 20px 0 20px;
  border: none;
  display: flex;
  flex-wrap: wrap;
`

const Image = styled.div`
  padding: 20px 0 0 0;
`

const ShipNavigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`

const ShipNavigationButton = styled(NavLink)`
  border: none;
  padding: 10px 20px;
  width: 45%;
  background: transparent;
  color: #fff;
  text-decoration: none;
  text-align: center;
`
