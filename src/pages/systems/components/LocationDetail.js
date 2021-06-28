import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../helper/localStorage'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'

MarketplaceDetail.propTypes = {
  allowsConstruction: PropTypes.bool,
  dockedShips: PropTypes.number,
  name: PropTypes.string,
  symbol: PropTypes.string,
  type: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
}

export default function MarketplaceDetail() {
  const [marketplaceDetail, setMarketplaceDetail] = useState([])
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
  }, [setMarketplaceDetail, token])

  return (
    <div>
      <h2>
        <BlinkingSpan>_</BlinkingSpan>Systems
      </h2>
      <h3>_Marketplace_OE-PM-TR</h3>
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
              <ul>
                <li>
                  <ImportantSpan key={symbol}>{symbol}</ImportantSpan>
                </li>
                <li>Available: {quantityAvailable} Units</li>
                <li>
                  Buy for {purchasePricePerUnit} Credits / {volumePerUnit} unit
                </li>
                <li>
                  Sell for {sellPricePerUnit} Credits / {volumePerUnit} unit
                </li>
              </ul>
            </ShipListContainer>
          </ShipList>
        )
      )}
    </div>
  )
}

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
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 500;
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
