import styled from 'styled-components/macro'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { loadFromLocal } from '../../../utils/localStorage'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

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
  const [success, setSuccess] = useState([])
  const [error, setError] = useState([])
  const { token } = loadFromLocal('token')
  const location = useLocation()
  const shipId = location.state?.shipId
  const shipType = location.state?.shipType

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

  // TRAVEL to location
  function handleTravel(symbol) {
    try {
      axios({
        method: 'post',
        url: 'https://api.spacetraders.io/my/flight-plans',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          destination: symbol,
          shipId: shipId.id,
        },
      })
      setSuccess(`Your ship is en route to ${symbol}`)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <h2>
        <BlinkingSpan>_</BlinkingSpan>Fleet
      </h2>
      <h3>_TRAVEL_{shipType.type}</h3>
      <Messages>
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Messages>
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
                <LocationDetailButton
                  onClick={() => handleTravel(symbol, shipId)}
                >
                  TRAVEL TO {symbol}
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
  margin-top: 40px;
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
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`

const LocationDetailButton = styled.button`
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
const ErrorMessage = styled.div`
  color: crimson;
  font-weight: bold;
`
const SuccessMessage = styled.div`
  color: rgba(0, 250, 0, 1);
`
const Messages = styled.div`
  height: 20px;
  text-align: right;
  line-height: 20px;
`

const BlinkingSpan = styled.span`
  animation: blinkingText 1.2s infinite;
  @keyframes blinkingText {
    0% {
      color: #fff;
    }
    49% {
      color: #fff;
    }
    50% {
      color: transparent;
    }
    99% {
      color: transparent;
    }
    100% {
      color: #fff;
    }
  }
`
