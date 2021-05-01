import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import StripeCardFormSplit from '../../src/components/stripe/StripeCardFormSplit'
import ShowResponse from '../helpComponents/ShowResponse'
import '../helpComponents/ShowResponse.css'
import HelpInstructions from '../helpComponents/HelpInstructions'

// ----- Story -----

export default {
  title: 'Stripe/StripeCardFormSplit'
}

export const SplitForm = () => {
  const [response, setResponse] = useState()

  const handleResponse = (value) => {
    action('onResponse')(value)
    setResponse(value)
  }

  return (
    <>
      <HelpInstructions />

      <StripeCardFormSplit
        stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
        onResponse={handleResponse}
      />

      <ShowResponse
        response={response}
      />
    </>
  )
}