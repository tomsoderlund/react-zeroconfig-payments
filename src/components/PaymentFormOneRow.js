import React from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js'
import stripeOptions from './lib/stripeOptions'

const CardFormOneRow = () => {
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
        <CardElement
          options={stripeOptions}
          onReady={() => {
            console.log('CardElement [ready]')
          }}
          onChange={event => {
            console.log('CardElement [change]', event)
          }}
          onBlur={() => {
            console.log('CardElement [blur]')
          }}
          onFocus={() => {
            console.log('CardElement [focus]')
          }}
        />
      </label>
      <button type='submit' disabled={!stripe}>
      Pay
      </button>
    </form>
  )
}

const CardFormOneRowWithElements = ({ stripePublicKey }) => {
  const stripePromise = loadStripe(stripePublicKey)
  return (
    <Elements stripe={stripePromise}>
      <CardFormOneRow />
    </Elements>
  )
}

export default CardFormOneRowWithElements
