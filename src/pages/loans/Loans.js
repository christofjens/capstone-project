import styled from 'styled-components/macro'
import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../helper/localStorage'
import axios from 'axios'
import Showloans from '../../components/Showloans/Showloans'
import Myloans from '../../components/Myloans/Myloans'

export default function Loans() {
  const [error, setError] = useState('')
  const [availableLoans, setAvailableLoans] = useState([])
  const [takenLoans, setTakenLoans] = useState([])
  const { token } = loadFromLocal('token')

  console.log(token)

  useEffect(() => {
    ;(async () => {
      const result = await axios.get(
        'https://api.spacetraders.io/types/loans',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setAvailableLoans(result.data.loans)
    })()
    ;(async () => {
      const result = await axios.get('https://api.spacetraders.io/my/loans', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      setTakenLoans(result.data.loans)
    })()
  }, [])

  function handleTakeOutLoan(type) {
    try {
      axios({
        method: 'post',
        url: 'https://api.spacetraders.io/my/loans',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { type: `${type}` },
      })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <h2>Loans</h2>
      <h3>Available Loans</h3>
      {availableLoans.map(
        ({ amount, collateralRequired, rate, termInDays, type }) => (
          <section>
            <Showloans
              amount={amount}
              key={type}
              loantype={type}
              collateralRequired={collateralRequired}
              termInDays={termInDays}
              rate={rate}
            />
            <button onClick={() => handleTakeOutLoan(type)}>
              Take the {type} loan.
            </button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
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

const ErrorMessage = styled.div`
  color: crimson;
  font-weight: bold;
  margin-top: 15px;
`
