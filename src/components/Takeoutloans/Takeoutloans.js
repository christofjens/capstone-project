import styled from 'styled-components'
import PropTypes from 'prop-types'

Takeoutloans.propTypes = {
  takeOutLoan: PropTypes.func,
  handleMyLoansNavigate: PropTypes.func,
  loantype: PropTypes.string,
}

export default function Takeoutloans({
  loantype,
  takeOutLoan,
  handleMyLoansNavigate,
}) {
  return <Button conClick={handleTakeOutLoan} />

  function handleTakeOutLoan() {
    takeOutLoan(loantype)
    handleMyLoansNavigate('myLoans')
  }
}

const Button = styled.button`
  border: none;
  padding: 10px 20px;
  width: 100%;
  font-size: 1rem;
  font-family: 'Titillium Web', monospace;
  font-weight: 400;
  background-color: transparent;
  color: #eee;
`
