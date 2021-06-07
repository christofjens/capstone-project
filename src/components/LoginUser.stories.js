import LoginUser from './LoginUser.js'
export default {
  title: 'LoginUser',
  component: LoginUser,
}

const Template = args => <LoginUser {...args} />

export const Default = Template.bind({})
Default.args = {}
