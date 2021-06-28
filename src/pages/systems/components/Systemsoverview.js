import styled from 'styled-components/macro'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { loadFromLocal } from '../../../helper/localStorage'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

SystemsOverview.propTypes = {
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
    <>
      <h3>_System_Overview</h3>
      <SystemsOverviewList>
        {systemsOverview.map(
          ({ symbol, allowsConstruction, name, type, x, y }) => (
            <div>
              <SystemsOverviewContainer>
                <ul>
                  <li key={symbol}>
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
                <LocationDetailButton exact to="locationdetail">
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
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 400;
  background-color: transparent;
  color: #eee;
  text-decoration: none;
  text-align: center;
`
const ImportantSpan = styled.span`
  font-weight: 400;
  color: rgba(255, 170, 0, 1);
`
