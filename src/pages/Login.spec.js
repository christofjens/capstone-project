import { render, screen } from '@testing-library/react'
import Login from './Login'

describe('Login', () => {
  it('renders', () => {
    render(<Login />)
    expect(screen.getByRole('form')).toBeInTheDocument()
  })
})
