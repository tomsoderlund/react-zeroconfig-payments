import React from 'react'
// import { action } from '@storybook/addon-actions'

import PaymentFormSplit from '../src/components/PaymentFormSplit'
import '../src/components/common.css'

// import { stringArray, objectArrayWithDisabled } from './data/arrays'

const STRIPE_PUBLIC_KEY = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'

// ----- Story -----

export default {
  title: 'PaymentFormSplit'
}

export const SplitForm = () => {
  // const [selected, setSelected] = useState(stringArray[1])

  // const handleSelect = (value, index) => {
  //   action('onSelect')(value, index)
  //   setSelected(value)
  // }

  return (
    <PaymentFormSplit
      stripePublicKey={STRIPE_PUBLIC_KEY}
    />)
}
