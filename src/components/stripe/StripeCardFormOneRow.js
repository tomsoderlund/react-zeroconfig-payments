import React from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js'
import stripeOptions from '../../lib/stripeOptions'

const StripeCardFormOneRowWithoutElements = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    console.log('[PaymentMethod]', payload)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
      Card details
        {/* Events: onReady, onChange, onBlur, onFocus */}
        <CardElement
          options={stripeOptions}
        />
      </label>
      <button type='submit' disabled={!stripe}>
      Pay
      </button>
    </form>
  )
}

const StripeCardFormOneRowWithElements = ({ stripeAppPublicKey }) => {
  const stripePromise = loadStripe(stripeAppPublicKey)
  return (
    <Elements stripe={stripePromise}>
      <StripeCardFormOneRowWithoutElements />
    </Elements>
  )
}

export default StripeCardFormOneRowWithElements
