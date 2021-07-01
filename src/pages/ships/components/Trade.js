import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../utils/localStorage'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

MarketplaceDetail.propTypes = {
  pricePerUnit: PropTypes.number,
  purchasePricePerUnit: PropTypes.number,
  quantityAvailable: PropTypes.number,
  sellPricePerUnit: PropTypes.number,
  symbol: PropTypes.string,
  volumePerUnit: PropTypes.number,
}

export default function MarketplaceDetail() {
  const [marketplaceDetail, setMarketplaceDetail] = useState([])
  const [shipInfo, setShipInfo] = useState({})
  const [shipCargo, setShipCargo] = useState([])
  const { token } = loadFromLocal('token')

  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.spacetraders.io/locations/OE-PM-TR/marketplace',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setMarketplaceDetail(result.data.marketplace)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.spacetraders.io/my/ships/ckqjv7i0484984415s60mnvggqg',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setShipInfo(result.data.ship)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.spacetraders.io/my/ships/ckqjv7i0484984415s60mnvggqg',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setShipCargo(result.data.ship.cargo)
    })()
  }, [])

  return (
    <Main>
      <InnerMain>
        <h2>
          <BlinkingSpan>_</BlinkingSpan>Fleet
        </h2>
        <h3>_TRADE/{shipInfo.type}</h3>
        <ShipList>
          <ShipListContainer>
            <ul>
              <li>
                <ImportantSpan>Current Cargo</ImportantSpan> (
                {shipInfo.spaceAvailable}/{shipInfo.maxCargo} free)
              </li>
              {shipCargo.map(({ good, totalVolume }) => (
                <li key={good}>
                  {good}: {totalVolume} units
                </li>
              ))}
            </ul>
          </ShipListContainer>
        </ShipList>
        {marketplaceDetail.map(
          ({
            pricePerUnit,
            purchasePricePerUnit,
            quantityAvailable,
            sellPricePerUnit,
            symbol,
            volumePerUnit,
          }) => (
            <ShipList>
              <ShipListContainer>
                <SubSection>
                  <ul>
                    <li>{symbol} </li>
                    <li>
                      <ImportantSpan>
                        Buy for {purchasePricePerUnit}
                      </ImportantSpan>{' '}
                      Credits or
                    </li>
                    <li>
                      <ImportantSpan>sell for {sellPricePerUnit}</ImportantSpan>{' '}
                      Credits
                    </li>
                  </ul>
                  <BuySellContainer>
                    <BuySellButton>-10</BuySellButton>
                    {'/'}
                    <BuySellButton>-1</BuySellButton>
                    {'/'}
                    <BuySellButton>+1</BuySellButton>
                    {'/'}
                    <BuySellButton>+10</BuySellButton>
                  </BuySellContainer>
                </SubSection>
              </ShipListContainer>
            </ShipList>
          )
        )}
      </InnerMain>
      <InnerNavigation>
        <InnerNavigationButton to="/ships">
          RETURN TO SHIPS
        </InnerNavigationButton>
      </InnerNavigation>
    </Main>
  )
}

const Main = styled.section`
  display: grid;
  grid-template-rows: auto 60px;
  position: relative;
`

const InnerMain = styled.div`
  overflow-y: scroll;
`

const InnerNavigation = styled.div`
  width: 100%;
  max-width: 600px;
  height: 60px;
  margin: 0 0 0 -20px;
  background: rgba(0, 18, 30, 1);
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 60px;
`

const InnerNavigationButton = styled(NavLink)`
  border: none;
  padding: 10px 20px;
  width: 45%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 500;
  text-decoration: none;
  background-color: transparent;
  color: #eee;
`

const ImportantSpan = styled.span`
  font-weight: 500;
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

const SubSection = styled.ul`
  align-items: center;
  padding: 0;
  border: none;
`

const BuySellContainer = styled.div`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 20px -20px;
`

const BuySellButton = styled.button`
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 500;
  background: transparent;
  color: #eee;
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
