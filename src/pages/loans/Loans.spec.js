
import {render, screen} from '@testing-library/react'
import Loans from './Loans'
      
describe('Loans', () => {
       it('renders', () => {
        render(<Loans />)
        expect(screen.getByText('Loans')).toBeInTheDocument()
    })
})
    