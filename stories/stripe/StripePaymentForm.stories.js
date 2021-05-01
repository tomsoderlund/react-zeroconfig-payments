import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import StripePaymentForm from '../../src/components/stripe/StripePaymentForm'
import ShowResponse from '../helpComponents/ShowResponse'
import '../helpComponents/ShowResponse.css'
import HelpInstructions from '../helpComponents/HelpInstructions'

// ----- Story -----

export default {
  title: 'Stripe/StripePaymentForm'
}

export const standard = () => {
  const [response, setResponse] = useState()

  const handleResponse = (value) => {
    action('onResponse')(value)
    setResponse(value)
  }

  return (
    <div>
      <HelpInstructions />

      <StripePaymentForm
        stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
        onResponse={handleResponse}
        companyRequired={false}
        amount={200}
        customerId='cus_JP7lD57IzN7RGC'
      />

      <ShowResponse
        response={response}
      />
    </div>
  )
}
