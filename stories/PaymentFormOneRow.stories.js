import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import PaymentFormOneRow from '../src/components/PaymentFormOneRow'
import '../src/components/PaymentFormOneRow.css'
import '../src/components/common.css'

// import { stringArray, objectArrayWithDisabled } from './data/arrays'

const STRIPE_PUBLIC_KEY = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'

// ----- Story -----

export default {
  title: 'PaymentFormOneRow'
}

export const standard = () => {
  // const [selected, setSelected] = useState(stringArray[1])

  // const handleSelect = (value, index) => {
  //   action('onSelect')(value, index)
  //   setSelected(value)
  // }

  return (
    <PaymentFormOneRow
      stripePublicKey={STRIPE_PUBLIC_KEY}
    />)
}
