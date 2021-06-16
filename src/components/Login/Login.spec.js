import { render, screen } from '@testing-library/react'
import Login from './Login'

describe('Login', () => {
  it('renders one text input and one submit button', () => {
    render(<Login />)

    const input = screen.getByRole('textbox', { name: 'login' })
    expect(input).toBeInTheDocument()

    const button = screen.getByRole('button', { name: 'Submit' })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
})
