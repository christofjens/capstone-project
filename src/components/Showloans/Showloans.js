// import styled from 'styled-components/macro'

export default function Showloans({
  amount,
  collateralRequired,
  rate,
  termInDays,
  type,
}) {
  return (
    <>
      <p>{type}</p>
      <p>{amount} Credits</p>
      <p>Interest rate: {rate}%</p>
      <p>
        This loan hat to be paid back in {termInDays} days and requires{' '}
        {collateralRequired === true ? 'collateral' : 'no collateral'}.
      </p>
    </>
  )
}
