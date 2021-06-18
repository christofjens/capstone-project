import { render, screen } from '@testing-library/react'
import Showloans from './Showloans'

describe('Showloans', () => {
  it('renders loan facts', () => {
    render(
      <Showloans
        amount="100000"
        collateralRequired="false"
        rate="40"
        termInDays="2"
        type="STARTER"
      />
    )

    expect(screen.getByText('STARTER')).toBeInTheDocument()
    expect(screen.getByText('100000 Credits')).toBeInTheDocument()
    expect(screen.getByText('Interest rate: 40%')).toBeInTheDocument()
    expect(
      screen.getByText(
        /.*loan.*2 days.*no collateral/i
      )
    ).toBeInTheDocument()
  })
})
