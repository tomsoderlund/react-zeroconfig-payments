import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import PaymentForm from '../../src/components/stripe/PaymentForm'
import ShowResponse from '../helpComponents/ShowResponse'
import '../helpComponents/ShowResponse.css'

const paymentIntent = {
  id: 'pi_1GGmYnAdCgUa7NQtcSJOhtKb',
  client_secret: 'pi_1GGmYnAdCgUa7NQtcSJOhtKb_secret_0VvmPm6vbhr3Je90i4F8oDy6Q',
  amount: 1000,
  currency: 'sek',
  payment_method: null,
  customer: 'cus_GoPLv5dzn5DazS'
}

// ----- Story -----

export default {
  title: 'Stripe/PaymentForm'
}

export const standard = () => {
  const [response, setResponse] = useState()

  const handleResponse = (value) => {
    action('onResponse')(value)
    setResponse(value)
  }

  return (
    <div>
      <p>Test card number: 4242424242424242</p>

      <PaymentForm
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
