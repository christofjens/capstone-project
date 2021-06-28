import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { loadFromLocal } from '../../../helper/localStorage'

Showloans.propTypes = {
  type: PropTypes.string,
  amount: PropTypes.number,
  rate: PropTypes.number,
  termInDays: PropTypes.number,
  collateralRequired: PropTypes.bool,
}

export default function Showloans() {
  // const [error, setError] = useState('')
  const [availableLoans, setAvailableLoans] = useState([])
  const { token } = loadFromLocal('token')

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
      // setError(error.message)
    }
  }

  return (
    <>
      <h3>_Take_New_Loan</h3>
      {availableLoans.map(
        ({ amount, collateralRequired, rate, termInDays, type }) => (
          <LoanListContainer>
            <LoanList>
              <ul>
                <li>
                  <ImportantSpan>Loan Type: {type}</ImportantSpan>
                </li>
                <li>Amount: {amount} Credits</li>
                <li>Interes Rate: {rate}%</li>
                <li>Due within {termInDays} days</li>
                <li>{collateralRequired} </li>
              </ul>
            </LoanList>
            <TakeOutLoanButtonContainer>
              <TakeOutLoanButton onClick={() => handleTakeOutLoan(type)}>
                TAKE THE {type} LOAN
              </TakeOutLoanButton>
            </TakeOutLoanButtonContainer>
            {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
          </LoanListContainer>
        )
      )}
    </>
  )
}

// const ErrorMessage = styled.div`
//   color: crimson;
//   font-weight: bold;
//   margin-top: 15px;
// `

const LoanList = styled.div`
  padding: 20px;
  border: none;
  li {
    list-style: none;
  }
`

const LoanListContainer = styled.div`
  padding: 20px 0 0 0;
  border: 0;
`

const TakeOutLoanButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`

const TakeOutLoanButton = styled.button`
  border: none;
  padding: 10px 20px;
  width: 100%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 400;
  background-color: transparent;
  color: #eee;
`

const ImportantSpan = styled.span`
  font-weight: 600;
  color: rgba(255, 170, 0, 1);
`
