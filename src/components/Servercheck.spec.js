import { render, screen } from '@testing-library/react'
import Servercheck from './Servercheck'

describe('Servercheck', () => {
  it('renders', () => {
    render(<Servercheck />)
    expect(
      screen.getByText('The Server is currently active')
    ).toBeInTheDocument()
  })
})
