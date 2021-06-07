
import {render, screen} from '@testing-library/react'
import Servercheck from './Servercheck'
      
describe('Servercheck', () => {
       it('renders', () => {
        render(<Servercheck />)
        expect(screen.getByText('Servercheck')).toBeInTheDocument()
    })
})
    