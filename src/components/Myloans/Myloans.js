import PropTypes from 'prop-types'

Showloans.propTypes = {
  type: PropTypes.string,
  status: PropTypes.string,
  repaymentAmount: PropTypes.number,
  id: PropTypes.string,
  due: PropTypes.string,
}

export default function Showloans({ type, status, repaymentAmount, due }) {
  return (
    <section>
      <ul>
        <li>
          <strong>
            {type}, ({status} loan)
          </strong>
        </li>
        <li>{repaymentAmount} Credits</li>
        <li>Due on {due}</li>
      </ul>
    </section>
  )
}
