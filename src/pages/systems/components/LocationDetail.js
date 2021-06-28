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
        url: 'https://api.spacetraders.io/marketplaces/OE-PM-TR/marketplace',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        // data: { locationSymbol: 'OE-PM-TR' },
      })
      setMarketplaceDetail(result.data.marketplace)
    })()
  }, [setMarketplaceDetail, token])

  return (
    <div>
      <h3>_MARKETPLACE_OE-PM-TR</h3>
      <MarketplaceDetailList>
        {marketplaceDetail.map(
          ({
            pricePerUnit,
            purchasePricePerUnit,
            quantityAvailable,
            sellPricePerUnit,
            spread,
            symbol,
            volumePerUnit,
          }) => (
            <ul>
              <li>
                <strong key={symbol}>_{symbol}</strong>
              </li>
              <li>{quantityAvailable} Units available</li>
              <li>
                Purchase price: {purchasePricePerUnit} / {volumePerUnit}
              </li>
              <li>
                Sell price: {sellPricePerUnit} / {volumePerUnit}
              </li>
            </ul>
          )
        )}
      </MarketplaceDetailList>
    </div>
  )
}

const MarketplaceDetailList = styled.ul`
  margin-top: 40px;
  li {
    list-style: none;
  }
`
