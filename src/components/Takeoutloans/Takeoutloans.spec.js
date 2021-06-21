
import {render, screen} from '@testing-library/react'
import Takeoutloans from './Takeoutloans'
      
describe('Takeoutloans', () => {
       it('renders', () => {
        render(<Takeoutloans />)
        expect(screen.getByText('Takeoutloans')).toBeInTheDocument()
    })
})
    