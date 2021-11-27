import React from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import { ContactInfoForm } from '../../src/components'

// ----- Story -----

export default {
  title: 'Common/ContactInfoForm'
}

const Template = ({ showFields, companyRequired }) => {
  const handleChange = (value, index) => {
    action('onChange')(JSON.stringify(value, null, 2))
  }

  return (
    <ContactInfoForm
      onChange={handleChange}
      showFields={showFields}
      companyRequired={companyRequired}
    />)
}

export const Default = () => (
  <Template />
)

export const CompanyRequired = () => (
  <Template
    companyRequired
  />
)

export const JustEmail = () => (
  <Template
    showFields={['email']}
  />
)
