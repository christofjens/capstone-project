import styled from 'styled-components/macro'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { loadFromLocal } from '../../../utils/localStorage'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

SystemsOverview.propTypes = {
  allowsConstruction: PropTypes.bool,
  dockedShips: PropTypes.number,
  name: PropTypes.string,
  symbol: PropTypes.string,
  key: PropTypes.string,
  type: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
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
  }, [token])

  return (
    <>
      <h3>_System_Overview</h3>
      <SystemsOverviewList>
        {systemsOverview.map(
          ({ symbol, allowsConstruction, name, type, x, y }) => (
            <div key={symbol}>
              <SystemsOverviewContainer>
                <ul>
                  <li>
                    <ImportantSpan>
                      {type} {name}
                    </ImportantSpan>{' '}
                    ({symbol})
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
                <LocationDetailButton exact to="/systems/detail">
                  GET {type} DETAILS
                </LocationDetailButton>
              </LocationDetailButtonContainer>
            </div>
          )
        )}
      </SystemsOverviewList>
    </>
  )
}

const SystemsOverviewList = styled.ul`
  margin-top: 10px;
  border: none;
  li {
    list-style: none;
  }
`

const SystemsOverviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px 20px 20px;
  border: none;
`

const LocationDetailButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`

const LocationDetailButton = styled(NavLink)`
  border: none;
  padding: 10px 20px;
  width: 100%;
  background-color: transparent;
  color: #fff;
  text-decoration: none;
  text-align: center;
`
const ImportantSpan = styled.span`
  color: rgba(255, 170, 0, 1);
`
