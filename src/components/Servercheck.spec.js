import { render, screen } from '@testing-library/react'
import Servercheck from './Servercheck'

describe('Servercheck', () => {
  it('renders', () => {
    render(<Servercheck />)
    expect(
      screen.getByText('spacetraders is currently online and available to play')
    ).toBeInTheDocument()
  })
})
