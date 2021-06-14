
import Dashboard from './Dashboard'
export default {
    title: 'Dashboard',
    component: Dashboard
}
      
const Template = args => <Dashboard {...args} />
      
export const Default = Template.bind({})
Default.args = {}
    