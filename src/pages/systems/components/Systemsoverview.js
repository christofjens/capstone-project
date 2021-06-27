import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { loadFromLocal } from '../../../helper/localStorage'

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
  allowsConstruction: PropTypes.bool,
  dockedShips: PropTypes.number,
  name: PropTypes.string,
  symbol: PropTypes.string,
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

  console.log(systemsOverview)

  return (
    <SystemsOverviewList>
      {systemsOverview.map(
        ({ symbol, allowsConstruction, name, type, x, y }) => (
          <div>
            <SystemsOverviewContainer>
              <ul>
                <li key={symbol}>
                  <ImportantSpan>
                    {type} {name}
                  </ImportantSpan>
                </li>
                <li>
                  Grid x: {x}/y: {y}
                </li>
                <li>
                  {allowsConstruction === true
                    ? 'Construction of buildings is allowed'
                    : 'Construction of buildings is not allowed'}
                </li>
              </ul>
            </SystemsOverviewContainer>
            <LocationDetailButtonContainer>
              <LocationDetailButton onClick="">
                GET {type} DETAILS
              </LocationDetailButton>
            </LocationDetailButtonContainer>
          </div>
        )
      )}
    </SystemsOverviewList>
  )
}

const SystemsOverviewList = styled.ul`
  margin-top: 20px;
  border: none;
  li {
    list-style: none;
  }
`

const SystemsOverviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  border: none;
`

const LocationDetailButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`

const LocationDetailButton = styled.button`
  border: none;
  padding: 10px 20px;
  width: 100%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 400;
  background-color: transparent;
  color: #eee;
`
const ImportantSpan = styled.span`
  font-weight: 400;
  color: rgba(255, 120, 0, 0.9);
`
