import styled from 'styled-components'
import PropTypes from 'prop-types'
import useFetch from '../../../hooks/useFetch'

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
  const { data: systemsOverview } = useFetch(
    'https://api.spacetraders.io/systems/OE/locations'
  )
  const { data: marketplaceDetail } = useFetch(
    'https://api.spacetraders.io/locations/OE-PM/marketplace'
  )

  console.log(systemsOverview)

  return (
    <section>
      <h3>Overview</h3>
      <SystemsOverviewList>
        {systemsOverview.map(
          ({ symbol, allowsConstruction, name, type, x, y }) => (
            <div>
              <ul>
                <li key={symbol}>
                  {name} / {symbol}
                </li>
                <li>
                  {type}, Grid x: {x}/y: {y}
                </li>
                <li>
                  {allowsConstruction === true
                    ? 'Construction of buildings is allowed'
                    : 'Construction of buildings is not allowed'}
                </li>
              </ul>
              <LocationDetailButton onClick="">
                Get {type} {name}'s details
              </LocationDetailButton>
            </div>
          )
        )}
      </SystemsOverviewList>
      <h3>Marketplace of {systemsOverview.name}</h3>
      <MarketplaceList>
        {marketplaceDetail.map(
          ({
            volumePerUnit,
            symbol,
            sellPricePerUnit,
            quantityAvailable,
            purchasePricePerUnit,
          }) => (
            <ul>
              <li>{symbol}</li>
              <li>
                Buying price {purchasePricePerUnit} Credits per {volumePerUnit}{' '}
                unit
              </li>
              <li>
                Selling price {sellPricePerUnit} Credits per {volumePerUnit}{' '}
                unit
              </li>
              <li>
                {quantityAvailable} units of {symbol} are currently available.
              </li>
            </ul>
          )
        )}
      </MarketplaceList>
    </section>
  )
}

const SystemsOverviewList = styled.ul`
  margin-top: 40px;
  li {
    list-style: none;
  }
`

const MarketplaceList = styled.ul`
  margin-top: 40px;
  li {
    list-style: none;
  }
`

const LocationDetailButton = styled.button`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 7px;
  padding: 7px;
  margin-top: 20px;
`
