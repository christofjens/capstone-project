import { render, screen } from '@testing-library/react'
import UserLogin from './UserLogin'

describe('UserLogin', () => {
  it('renders', () => {
    render(<UserLogin />)
    expect(screen.getByText('UserLogin')).toBeInTheDocument()
  })
})
