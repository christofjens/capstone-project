import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders', () => {
    render(<button />)
    expect(screen.getByText('button')).toBeInTheDocument()
  })
})
