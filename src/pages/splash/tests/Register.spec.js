
import {render, screen} from '@testing-library/react'
import Register from './Register'
      
describe('Register', () => {
       it('renders', () => {
        render(<Register />)
        expect(screen.getByText('Register')).toBeInTheDocument()
    })
})
    