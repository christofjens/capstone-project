import { render, screen } from '@testing-library/react'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  it('renders a page with a headline and a list with username, token, credits, ships and buidlings', () => {
    render(<Dashboard />)
    const headline = screen.getByRole('heading', { level: 2 })
    expect(headline).toBeInTheDocument()
  })
})
