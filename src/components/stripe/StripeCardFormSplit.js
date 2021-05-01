import React from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement, Elements } from '@stripe/react-stripe-js'
import DEFAULT_STRIPE_OPTIONS from '../../lib/stripeOptions'

export const StripeCardFormSplitWithoutElements = ({
  stripeOptions = DEFAULT_STRIPE_OPTIONS,
  className,
  onResponse,
  buttonLabel = 'Pay now'
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) return

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement)
    })

    onResponse({ stripe, paymentMethod, card: elements.getElement(CardNumberElement), error })
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
        {buttonLabel}
      </button>
    </form>
  )
}

const StripeCardFormSplitWithElements = (props) => {
  const stripePromise = loadStripe(props.stripeAppPublicKey)
  return (
    <Elements stripe={stripePromise}>
      <StripeCardFormSplitWithoutElements
        {...props}
      />
    </Elements>
  )
}

export default StripeCardFormSplitWithElements
