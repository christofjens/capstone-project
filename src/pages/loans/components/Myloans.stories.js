
import Myloans from './Myloans'
export default {
    title: 'Myloans',
    component: Myloans
}
      
const Template = args => <Myloans {...args} />
      
export const Default = Template.bind({})
Default.args = {}
    