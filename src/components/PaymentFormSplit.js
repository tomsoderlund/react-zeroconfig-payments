import React from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement, Elements } from '@stripe/react-stripe-js'
import stripeOptions from './lib/stripeOptions'

const CardFormSplit = () => {
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
      card: elements.getElement(CardNumberElement)
    })

    console.log('[PaymentMethod]', payload)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card number
        <CardNumberElement
          options={stripeOptions}
          onReady={() => {
            console.log('CardNumberElement [ready]')
          }}
          onChange={event => {
            console.log('CardNumberElement [change]', event)
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]')
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]')
          }}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={stripeOptions}
          onReady={() => {
            console.log('CardNumberElement [ready]')
          }}
          onChange={event => {
            console.log('CardNumberElement [change]', event)
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]')
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]')
          }}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={stripeOptions}
          onReady={() => {
            console.log('CardNumberElement [ready]')
          }}
          onChange={event => {
            console.log('CardNumberElement [change]', event)
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]')
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]')
          }}
        />
      </label>
      <button type='submit' disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}

const CardFormSplitWithElements = ({ stripePublicKey }) => {
  const stripePromise = loadStripe(stripePublicKey)
  return (
    <Elements stripe={stripePromise}>
      <CardFormSplit />
    </Elements>
  )
}

export default CardFormSplitWithElements
