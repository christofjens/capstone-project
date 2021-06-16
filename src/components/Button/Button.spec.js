import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders', () => {
    render(<Button>Button</Button>)
    expect(screen.getByText('Button')).toBeInTheDocument()
  })
})
