import React from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js'
import DEFAULT_STRIPE_OPTIONS from '../../lib/stripeOptions'

const StripeCardFormOneRowWithoutElements = ({
  stripeOptions = DEFAULT_STRIPE_OPTIONS,
  className,
  onResponse,
  buttonLabel = 'Pay now'
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    onResponse({ stripe, paymentMethod, card: elements.getElement(CardElement), error })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
    >
      <label>
      Card details
        {/* Events: onReady, onChange, onBlur, onFocus */}
        <CardElement
          options={stripeOptions}
        />
      </label>
      <button type='submit' disabled={!stripe}>
        {buttonLabel}
      </button>
    </form>
  )
}

const StripeCardFormOneRowWithElements = (props) => {
  const stripePromise = loadStripe(props.stripeAppPublicKey)
  return (
    <Elements stripe={stripePromise}>
      <StripeCardFormOneRowWithoutElements
        {...props}
      />
    </Elements>
  )
}

export default StripeCardFormOneRowWithElements
