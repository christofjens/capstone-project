import UserLogin from './UserLogin.js'
export default {
  title: 'UserLogin',
  component: UserLogin,
}

const Template = args => <UserLogin {...args} />

export const Default = Template.bind({})
Default.args = {}
