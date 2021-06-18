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
      <p>
        <strong>{type}</strong>
      </p>
      <p>{amount} Credits</p>
      <p>Interest rate: {rate}%</p>
      <p>
        This loan has to be paid back in {termInDays} days and requires
        {collateralRequired === true ? ' collateral' : ' no collateral'}.
      </p>
    </>
  )
}
