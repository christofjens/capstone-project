import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../utils/localStorage'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'
import { NavLink, useLocation } from 'react-router-dom'

MarketplaceDetail.propTypes = {
  pricePerUnit: PropTypes.number,
  purchasePricePerUnit: PropTypes.number,
  quantityAvailable: PropTypes.number,
  sellPricePerUnit: PropTypes.number,
  symbol: PropTypes.string,
  volumePerUnit: PropTypes.number,
  shipId: PropTypes.string,
}

export default function MarketplaceDetail() {
  const [marketplaceDetail, setMarketplaceDetail] = useState([])
  const [shipInfo, setShipInfo] = useState([])
  const [shipCargo, setShipCargo] = useState([])
  const [success, setSuccess] = useState([])
  const [error, setError] = useState([])
  const { token } = loadFromLocal('token')
  const location = useLocation()
  const shipId = location.state?.shipId
  const shipLocation = location.state?.location

  // get Marketplace and Goods
  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url:
          'https://api.spacetraders.io/locations/' +
          shipLocation.location +
          '/marketplace',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setMarketplaceDetail(result.data.marketplace)
    })()
  }, [shipLocation.location, token])

  // get Info on Ship
  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.spacetraders.io/my/ships/' + shipId.id,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setShipInfo(result.data.ship)
    })()
  }, [shipId, token])

  // get Info on Ship's cargo
  useEffect(() => {
    ;(async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.spacetraders.io/my/ships/' + shipId.id,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setShipCargo(result.data.ship.cargo)
    })()
  }, [shipId, token])

  // BUY Goods
  function handleBuyGoods(shipId, quantity, symbol) {
    try {
      axios({
        method: 'post',
        url: 'https://api.spacetraders.io/my/purchase-orders',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          shipId: shipId.id,
          quantity: `${quantity}`,
          good: `${symbol}`,
        },
      })
      setSuccess(`${quantity} ${symbol} added to your cargo!`)
    } catch (error) {
      setError(error.message)
    }
  }

  // SELL Goods
  function handleSellGoods(shipId, quantity, symbol) {
    try {
      axios({
        method: 'post',
        url: 'https://api.spacetraders.io/my/sell-orders',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          shipId: shipId.id,
          quantity: `${quantity}`,
          good: `${symbol}`,
        },
      })
      setSuccess(`${quantity} ${symbol} removed from your cargo!`)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Main>
      <InnerMain>
        <h2>
          <BlinkingSpan>_</BlinkingSpan>Fleet
        </h2>
        <h3>_TRADE_{shipInfo.type}</h3>
        <Messages>
          {success && <SuccessMessage>{success}</SuccessMessage>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Messages>
        <ShipList>
          <ShipListContainer2>
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
          </ShipListContainer2>
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
            <ShipList key={shipId}>
              <ShipListContainer>
                <SubSection>
                  <ul>
                    <li>
                      <ImportantSpan>{symbol}</ImportantSpan>
                    </li>
                    <li>Purchase price: {purchasePricePerUnit} Credits</li>
                    <li>Selling price: {sellPricePerUnit} Credits</li>
                  </ul>
                  <BuySellContainer>
                    <BuySellButton
                      value="10"
                      onClick={e =>
                        handleSellGoods(shipId, e.currentTarget.value, symbol)
                      }
                    >
                      -10
                    </BuySellButton>
                    {'/'}
                    <BuySellButton
                      value="1"
                      onClick={e =>
                        handleSellGoods(shipId, e.currentTarget.value, symbol)
                      }
                    >
                      -1
                    </BuySellButton>
                    {'/'}
                    <BuySellButton
                      value="1"
                      onClick={e =>
                        handleBuyGoods(shipId, e.currentTarget.value, symbol)
                      }
                    >
                      +1
                    </BuySellButton>
                    {'/'}
                    <BuySellButton
                      value="10"
                      onClick={e =>
                        handleBuyGoods(shipId, e.currentTarget.value, symbol)
                      }
                    >
                      +10
                    </BuySellButton>
                  </BuySellContainer>
                </SubSection>
              </ShipListContainer>
            </ShipList>
          )
        )}
      </InnerMain>
      <InnerNavigation>
        <InnerNavigationButton to="/ships">
          RETURN TO YOUR SHIPS
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
  width: 100%;
  text-decoration: none;
  text-align: center;
  background-color: transparent;
  color: #fff;
`

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
const ShipListContainer2 = styled.div`
  padding: 20px 20px 0 20px;
  border: 0;
  height: 140px;
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
  background: transparent;
  color: #fff;
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
