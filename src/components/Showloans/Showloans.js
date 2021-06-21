// import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Showloans.propTypes = {
  type: PropTypes.string,
  amount: PropTypes.number,
  rate: PropTypes.number,
  termInDays: PropTypes.number,
  collateralRequired: PropTypes.bool,
}

export default function Showloans({
  amount,
  collateralRequired,
  rate,
  termInDays,
  type,
}) {
  return (
    <>
      <ul>
        <li>
          <strong>{type}</strong>
        </li>
        <li>{amount} Credits</li>
        <li>Interest rate: {rate}%</li>
        <li>
          This loan has to be paid back in {termInDays} days and requires
          {collateralRequired === true ? ' collateral' : ' no collateral'}.
        </li>
      </ul>
    </>
  )
}
