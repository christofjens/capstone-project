// import styled from 'styled-components/macro'
import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../helper/localStorage'
import axios from 'axios'
import Showloans from '../../components/Showloans/Showloans'
import Myloans from '../../components/Myloans/Myloans'
import Takeoutloans from '../../components/Takeoutloans/Takeoutloans'
import PropTypes from 'prop-types'

Loans.propTypes ={
  loantype: PropTypes.string,
  takeOutLoan: PropTypes.func,
  
}

export default function Loans({takeOutLoan}) {
  const [availableLoans, setAvailableLoans] = useState([])
  const [takenLoans, setTakenLoans] = useState([])
  const { token } = loadFromLocal('token')

  useEffect(() => {
    ;(async () => {
      const result = await axios.get(
        'https://api.spacetraders.io/types/loans',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setAvailableLoans(result.data.loans)
    })()
    ;(async () => {
      const result = await axios.get('https://api.spacetraders.io/my/loans', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTakenLoans(result.data.loans)
    })()

  return (
    <>
      <h2>Loans</h2>
      <h3>Available Loans</h3>
      {availableLoans.map(
        ({ amount, collateralRequired, rate, termInDays, type }) => (
          <section>
            <Showloans
              amount={amount}
              type={type}
              collateralRequired={collateralRequired}
              termInDays={termInDays}
              rate={rate}
            />
            <Takeoutloans takeOutLoan={takeOutLoan} type={type} />
          </section>
        )
      )}
      <h3>Taken Loans</h3>
      {takenLoans.map(({ type, status, repaymentAmount, due, id }) => (
        <section>
          <Myloans
            type={type}
            status={status}
            repaymentAmount={repaymentAmount}
            due={due}
            key={id}
          />
        </section>
      ))}
    </>
  )
}
