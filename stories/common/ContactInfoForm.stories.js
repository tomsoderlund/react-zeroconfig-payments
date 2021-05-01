import React from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import ContactInfoForm from '../../src/components/common/ContactInfoForm'

// ----- Story -----

export default {
  title: 'Common/ContactInfoForm'
}

export const Default = () => {
  const handleChange = (value, index) => {
    action('onChange')(value, index)
  }

  return (
    <ContactInfoForm
      onChange={handleChange}
    />)
}
