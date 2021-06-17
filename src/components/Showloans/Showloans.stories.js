import Showloans from './Showloans'
import React from 'react'

export default {
  title: 'Showloans',
  component: Showloans,
}

const Template = args => <Showloans {...args} />

export const Default = Template.bind({})
Default.args = {
  amount: '200000',
  collateralRequired: true,
  rate: 40,
  termInDays: 2,
  type: 'STARTER',
}
