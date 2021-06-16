import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { BASE_URL } from '../../helper/url'

export default function Showloans() {
  const [availableLoans, setAvailableLoans] = useState([])

  useEffect(() => {
    fetch(BASE_URL + '/my/loans')
      .then(res => res.json())
      .then(resBody => setAvailableLoans(resBody.loans))
      .catch(err => console.error(err))
  }, [])
  console.log(availableLoans)
  return (
    <LoansWrapper>
      <h2>ShowLoans</h2>
      <h3>Current Balance:</h3>
      <p>0 Credits</p>
      <h3>Available Loans:</h3>
      <p>{availableLoans} 200.000 Credits</p>
      <h3>Taken Loans:</h3>
      <p>none</p>
      <p>You don't have enough credits to repay your loan.</p>
    </LoansWrapper>
  )
}

const LoansWrapper = styled.section`
  padding: 20px;
  gap: 20px;
`
