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
      <h2>
        <BlinkingSpan>_</BlinkingSpan>Loans
      </h2>
      <h3>_Available_Loans</h3>
      {availableLoans.map(
        ({ amount, collateralRequired, rate, termInDays, type }) => (
          <section>
            <Showloans
              amount={amount}
              type={type}
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
      <h3>_Taken_Loans</h3>
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
