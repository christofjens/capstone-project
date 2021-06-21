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
      <p>
        <strong>
          {type}, {status}
        </strong>
      </p>
      <p>{repaymentAmount} Credits</p>
      <p>Due on {due}</p>
    </section>
  )
}
