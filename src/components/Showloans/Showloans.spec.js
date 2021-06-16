
import {render, screen} from '@testing-library/react'
import Showloans from './Showloans'
      
describe('Showloans', () => {
       it('renders', () => {
        render(<Showloans />)
        expect(screen.getByText('Showloans')).toBeInTheDocument()
    })
})
    