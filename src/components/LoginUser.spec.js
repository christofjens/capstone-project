
import {render, screen} from '@testing-library/react'
import LoginUser from './LoginUser'
      
describe('LoginUser', () => {
       it('renders', () => {
        render(<LoginUser />)
        expect(screen.getByText('LoginUser')).toBeInTheDocument()
    })
})
    