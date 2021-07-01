import { useState, useEffect } from 'react'
import { loadFromLocal } from '../../../utils/localStorage'
import styled from 'styled-components/macro'
import axios from 'axios'
import PropTypes from 'prop-types'

GetLoans.propTypes = {
  type: PropTypes.string,
  amount: PropTypes.number,
  rate: PropTypes.number,
  termInDays: PropTypes.number,
  collateralRequired: PropTypes.bool,
}

export default function GetLoans() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
  }, [token])

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
      setSuccess(`1 ${type} loan taken!`)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h3>_Take_New_Loan</h3>
      {availableLoans.map(
        ({ amount, collateralRequired, rate, termInDays, type }) => (
          <LoanListContainer>
            <LoanList>
              <ul>
                <li>
                  <ImportantSpan>Loan Type: {type}</ImportantSpan>
                </li>
                <li>
                  Amount: {new Intl.NumberFormat('de-DE').format(amount)}{' '}
                  Credits
                </li>
                <li>Interest Rate: {rate}%</li>
                <li>Due within {termInDays} days</li>
                <li>{collateralRequired} </li>
              </ul>
            </LoanList>
            <TakeOutLoanButtonContainer>
              <TakeOutLoanButton onClick={() => handleTakeOutLoan(type)}>
                TAKE THE {type} LOAN
              </TakeOutLoanButton>
            </TakeOutLoanButtonContainer>
            {success && <SuccessMessage>{success}</SuccessMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </LoanListContainer>
        )
      )}
    </div>
  )
}

const ErrorMessage = styled.div`
  color: crimson;
  padding: 20px;
`

const SuccessMessage = styled.div`
  color: rgba(0, 250, 0, 1);
  padding: 20px;
`

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
  background-color: transparent;
  color: #eee;
`

const ImportantSpan = styled.span`
  color: rgba(255, 170, 0, 1);
`
