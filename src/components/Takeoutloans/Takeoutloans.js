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
  margin-top: 20px;
  background-color: #fff;
  border: 2px solid #666;
  border-radius: 7px;
  /* box-shadow: 0 0 20px #ff184c; */
  padding: 10px;
  color: #666;
  width: 100%;
`
