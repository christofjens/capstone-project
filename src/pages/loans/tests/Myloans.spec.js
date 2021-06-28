import { render, screen } from '@testing-library/react'
import Myloans from '../components/Myloans'

describe('Myloans', () => {
  it('renders', () => {
    render(<Myloans />)
    expect(screen.getByText('Myloans')).toBeInTheDocument()
  })
})
