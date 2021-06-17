
import Loans from './Loans'
export default {
    title: 'Loans',
    component: Loans
}
      
const Template = args => <Loans {...args} />
      
export const Default = Template.bind({})
Default.args = {}
    