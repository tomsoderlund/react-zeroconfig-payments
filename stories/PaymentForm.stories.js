import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import PaymentForm from '../src/components/PaymentForm'
import '../src/components/PaymentForm.css'
import '../src/components/common.css'

// import { stringArray, objectArrayWithDisabled } from './data/arrays'

// ----- Story -----

export default {
  title: 'PaymentForm'
}

export const strings = () => {
  // const [selected, setSelected] = useState(stringArray[1])

  // const handleSelect = (value, index) => {
  //   action('onSelect')(value, index)
  //   setSelected(value)
  // }

  return (
    <PaymentForm />)
}
