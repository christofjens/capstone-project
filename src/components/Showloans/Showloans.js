import { useState } from 'react'
import styled from 'styled-components/macro'

export default function ShowLoans() {
  const [currentBalance, setCurrentBalance] = useState()

  return (
    <LoansWrapper>
      <h2>ShowLoans</h2>
      <h3>Current Balance:</h3>
      <p>0 Credits</p>
      <h3>Available Loans:</h3>
      <p>Starter: 200.000 Credits</p>
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
