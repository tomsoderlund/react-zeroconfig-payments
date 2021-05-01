import React, { useState, useEffect } from 'react'
import { action } from '@storybook/addon-actions'

import makeRestRequest from '../helpComponents/makeRestRequest'

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
  const [paymentIntent, setPaymentIntent] = useState()
  const [response, setResponse] = useState()

  useEffect(() => {
    async function fetchPaymentIntent () {
      const result = await makeRestRequest('POST', '/api/stripe/paymentIntents', { amount: 100 })
      setPaymentIntent(result)
    }
    fetchPaymentIntent()
  }, [])

  const handleResponse = (value) => {
    action('onResponse')(value)
    setResponse(value)
  }

  console.log('paymentIntent:', paymentIntent)

  return (
    <div>
      <HelpInstructions />

      <StripePaymentForm
        stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
        stripePaymentIntent={paymentIntent}
        onResponse={handleResponse}
        companyRequired={false}
      />

      <ShowResponse
        response={response}
      />
    </div>
  )
}
