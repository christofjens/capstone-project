// import styled from 'styled-components/macro'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { loadFromLocal } from '../../helper/localStorage'
import axios from 'axios'
import Showloans from '../../components/Showloans/Showloans'

Loans.propTypes = {
  token: PropTypes.string,
}

export default function Loans() {
  const [availableLoans, setAvailableLoans] = useState([])
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
  }, [])

  return (
    <>
      <h2>Loans</h2>
      <h3>Available Loans</h3>
      <section>
        {availableLoans.map(
          ({ amount, collateralRequired, rate, termInDays, type }) => (
            <Showloans
              amount={amount}
              type={type}
              collateralRequired={collateralRequired}
              termInDays={termInDays}
              rate={rate}
            />
          )
        )}
      </section>
    </>
  )
}
