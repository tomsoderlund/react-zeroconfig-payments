import React from 'react'
// import { action } from '@storybook/addon-actions'

import '../styles.css'
import StripeCardFormOneRow from '../../src/components/stripe/StripeCardFormOneRow'

// ----- Story -----

export default {
  title: 'Stripe/StripeCardFormOneRow'
}

export const OneRowForm = () => {
  // const [selected, setSelected] = useState(stringArray[1])

  // const handleSelect = (value, index) => {
  //   action('onSelect')(value, index)
  //   setSelected(value)
  // }

  return (
    <StripeCardFormOneRow
      stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
    />)
}
