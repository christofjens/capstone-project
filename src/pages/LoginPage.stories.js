import LoginPage from './LoginPage.js'
export default {
  title: 'LoginPage',
  component: LoginPage,
}

const Template = args => <LoginPage {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Success = Template.bind({})
Success.args = {}
