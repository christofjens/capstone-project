// import styled from 'styled-components/macro'
import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../helper/localStorage'
import { BASE_URL } from '../../helper/url'
import Showloans from '../../components/Showloans/Showloans'

export default function Loans() {
  const [availableLoans, setAvailableLoans] = useState([])
  const { token } = loadFromLocal('token')

  useEffect(() => {
    fetch(BASE_URL + '/types/loans', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(resBody => setAvailableLoans(resBody.loans))
      .catch(err => console.log(err))
  }, [token])

  return (
    <>
      <h2>Loans</h2>
      <h3>Available Loans</h3>
      <section>
        {availableLoans.map(
          ({ amount, collateralRequired, rate, termInDays, type }) => (
            <Showloans
              amount={amount}
              key={type}
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
