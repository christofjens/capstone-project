
import {render, screen} from '@testing-library/react'
import Splash from './Splash'
      
describe('Splash', () => {
       it('renders', () => {
        render(<Splash />)
        expect(screen.getByText('Splash')).toBeInTheDocument()
    })
})
    