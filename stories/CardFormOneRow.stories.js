import React from 'react'
// import { action } from '@storybook/addon-actions'

import CardFormOneRow from '../src/components/CardFormOneRow'
import '../src/components/common.css'

// import { stringArray, objectArrayWithDisabled } from './data/arrays'

const STRIPE_PUBLIC_KEY = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'

// ----- Story -----

export default {
  title: 'CardFormOneRow'
}

export const OneRowForm = () => {
  // const [selected, setSelected] = useState(stringArray[1])

  // const handleSelect = (value, index) => {
  //   action('onSelect')(value, index)
  //   setSelected(value)
  // }

  return (
    <CardFormOneRow
      stripePublicKey={STRIPE_PUBLIC_KEY}
    />)
}
