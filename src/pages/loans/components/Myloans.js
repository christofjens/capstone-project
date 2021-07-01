import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { loadFromLocal } from '../../../utils/localStorage'

Showloans.propTypes = {
  type: PropTypes.string,
  status: PropTypes.string,
  repaymentAmount: PropTypes.number,
  id: PropTypes.string,
  due: PropTypes.string,
  isActive: PropTypes.node,
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

  if (!takenLoans.length) {
    return (
      <>
        <h3>_Your_Loans</h3>
        <LoanListContainer>
          <LoanList>
            <ul>
              <li>
                <ImportantSpan>No loans.</ImportantSpan>
              </li>
              <li>
                You have no current loans. Click on GET NEW LOAN to take out a
                new loan.
              </li>
            </ul>
          </LoanList>
        </LoanListContainer>
      </>
    )
  }

  return (
    <>
      <h3>_Your_Loans</h3>
      {/* {takenLoans.length ? (
        takenLoans
      ) : (

      )} */}
      {takenLoans.map(({ type, status, repaymentAmount, due, id }) => (
        <LoanListContainer>
          <LoanList>
            <ul>
              <li>
                <ImportantSpan>{type} loan</ImportantSpan>
              </li>
              <li>Status: {status.toLowerCase()}</li>
              <li>
                Repayable amount:{' '}
                {new Intl.NumberFormat('de-DE').format(repaymentAmount)} Credits
              </li>
              <li>
                Due on{' '}
                {new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(new Date(due))}
              </li>
            </ul>
          </LoanList>
          <RepayLoanButtonContainer>
            <RepayLoanButton onClick={() => handleRepayLoan(type)}>
              REPAY YOUR {type} LOAN
            </RepayLoanButton>
          </RepayLoanButtonContainer>
          {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
        </LoanListContainer>
      ))}
    </>
  )
}

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

const RepayLoanButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`

const RepayLoanButton = styled.button`
  border: none;
  padding: 10px 20px;
  width: 100%;
  background-color: transparent;
  color: #fff;
`

const ImportantSpan = styled.span`
  color: rgba(255, 170, 0, 1);
`
