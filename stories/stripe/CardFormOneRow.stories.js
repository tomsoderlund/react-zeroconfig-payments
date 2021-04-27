import React from 'react'
// import { action } from '@storybook/addon-actions'

import '../styles.css'
import CardFormOneRow from '../../src/components/stripe/CardFormOneRow'

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
      stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
    />)
}
