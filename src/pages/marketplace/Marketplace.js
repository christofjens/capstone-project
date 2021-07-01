import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../utils/localStorage'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'

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
                <BuySellContainer>
                  <li>
                    Buy for {purchasePricePerUnit} Credits / {volumePerUnit}{' '}
                    unit
                  </li>
                  <li>
                    Sell for {sellPricePerUnit} Credits / {volumePerUnit} unit
                  </li>
                </BuySellContainer>
              </ul>
            </ShipListContainer>
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

const BuySellContainer = styled.div`
  display: flex;
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
