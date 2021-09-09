import GetLoans from './GetLoans'
import React from 'react'

export default {
  title: 'GetLoans',
  component: GetLoans,
}

const Template = args => <GetLoans {...args} />

export const WithCollateral = Template.bind({})
WithCollateral.args = {
  amount: '200000',
  collateralRequired: true,
  rate: 40,
  termInDays: 2,
  type: 'STARTER',
}

export const WithoutCollateral = Template.bind({})
WithoutCollateral.args = {
  amount: '100',
  collateralRequired: false,
  rate: 2,
  termInDays: 2,
  type: 'STARTER',
}
