import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { loadFromLocal } from '../../helper/localStorage'

Showloans.propTypes = {
  type: PropTypes.string,
  status: PropTypes.string,
  repaymentAmount: PropTypes.number,
  id: PropTypes.string,
  due: PropTypes.string,
}

export default function Showloans() {
  const [takenLoans, setTakenLoans] = useState([])
  const { token } = loadFromLocal('token')

  useEffect(() => {
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

  function handleRepayLoan(type) {
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
      <h3>_Taken_Loans</h3>
      {takenLoans.map(({ type, status, repaymentAmount, due, id }) => (
        <LoanListContainer>
          <LoanList>
            <ul>
              <li>Loan Type: {type}</li>
              <li>Status: {status}</li>
              <li>Repayable amount: {repaymentAmount}%</li>
              <li>Due on {due} days</li>
            </ul>
          </LoanList>
          <RepayLoanButtonContainer>
            <RepayLoanButton onClick={() => handleRepayLoan(type)}>
              REPAY THE {type} LOAN.
            </RepayLoanButton>
          </RepayLoanButtonContainer>
          {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
        </LoanListContainer>
      ))}
    </>
  )
}

const LoanList = styled.div`
  padding: 20px 0 0 0;
  border: none;
  li {
    list-style: none;
  }
`

const LoanListContainer = styled.div`
  padding: 20px 20px 0 20px;
  border: 0;
`

const RepayLoanButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`

const RepayLoanButton = styled.button`
  border: none;
  padding: 10px 20px;
  width: 100%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 400;
  background-color: transparent;
  color: #eee;
`

// const ImportantSpan = styled.span`
//   font-weight: 600;
//   color: rgba(255, 120, 0, 1);
// `
