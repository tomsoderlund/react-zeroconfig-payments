import React, { useState, useEffect } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import StripePaymentForm from '../../src/components/stripe/StripePaymentForm'
import ShowResponse from '../helpComponents/ShowResponse'
import '../helpComponents/ShowResponse.css'

// ----- Story -----

export default {
  title: 'Stripe/StripePaymentForm'
}

export const standard = () => {
  const [paymentIntent, setPaymentIntent] = useState()
  const [response, setResponse] = useState()

  useEffect(() => {
    async function fetchPaymentIntent () {
      const result = await window.fetch('/api/stripe/paymentIntents', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
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
      <blockquote>Test card number: 4242424242424242</blockquote>

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
