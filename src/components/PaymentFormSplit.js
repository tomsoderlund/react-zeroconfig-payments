import React from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement, Elements } from '@stripe/react-stripe-js'
import DEFAULT_STRIPE_OPTIONS from './lib/stripeOptions'

const CardFormSplit = ({ stripeOptions, className, onResponse }) => {
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

    onResponse(payload)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
    >
      <label>
        Card number
        {/* Events: onReady, onChange, onBlur, onFocus */}
        <CardNumberElement
          options={stripeOptions}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={stripeOptions}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={stripeOptions}
        />
      </label>
      <button type='submit' disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}

const CardFormSplitWithElements = ({ stripePublicKey, stripeOptions = DEFAULT_STRIPE_OPTIONS, className, onResponse }) => {
  const stripePromise = loadStripe(stripePublicKey)
  return (
    <Elements stripe={stripePromise}>
      <CardFormSplit
        stripeOptions={stripeOptions}
        className={className}
        onResponse={onResponse}
      />
    </Elements>
  )
}

export default CardFormSplitWithElements
