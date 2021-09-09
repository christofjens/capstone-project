import MyLoans from './MyLoans'
export default {
  title: 'MyLoans',
  component: MyLoans,
}

const Template = args => <MyLoans {...args} />

export const Default = Template.bind({})
Default.args = {}
