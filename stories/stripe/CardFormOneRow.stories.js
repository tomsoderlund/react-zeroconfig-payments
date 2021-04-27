import React from 'react'
// import { action } from '@storybook/addon-actions'

import '../styles.css'
import CardFormOneRow from '../../src/components/stripe/CardFormOneRow'

// import { stringArray, objectArrayWithDisabled } from './data/arrays'

const STRIPE_APP_PUBLIC_KEY = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'

// ----- Story -----

export default {
  title: 'Stripe/CardFormOneRow'
}

export const OneRowForm = () => {
  // const [selected, setSelected] = useState(stringArray[1])

  // const handleSelect = (value, index) => {
  //   action('onSelect')(value, index)
  //   setSelected(value)
  // }

  return (
    <CardFormOneRow
      stripeAppPublicKey={STRIPE_APP_PUBLIC_KEY}
    />)
}
