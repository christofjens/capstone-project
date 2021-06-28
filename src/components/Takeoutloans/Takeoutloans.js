import styled from 'styled-components'
import PropTypes from 'prop-types'

Takeoutloans.propTypes = {
  takeOutLoan: PropTypes.func,
  loantype: PropTypes.string,
}

export default function Takeoutloans({ loantype, takeOutLoan }) {
  return <Button conClick={handleTakeOutLoan} />

  function handleTakeOutLoan() {
    takeOutLoan(loantype)
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
