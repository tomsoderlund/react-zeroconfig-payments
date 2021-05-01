import React, { useState } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardElement, CardNumberElement, CardCvcElement, CardExpiryElement, Elements } from '@stripe/react-stripe-js'
import DEFAULT_STRIPE_OPTIONS from '../../lib/stripeOptions'

export const StripeCardFormWithoutElements = ({
  stripeOptions = DEFAULT_STRIPE_OPTIONS,
  className,
  onResponse,
  buttonLabel = 'Pay now',
  oneRow = false
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [inProgress, setInProgress] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setInProgress(true)

    // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) return

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(oneRow ? CardElement : CardNumberElement)
    })

    onResponse({ stripe, paymentMethod, card: elements.getElement(oneRow ? CardElement : CardNumberElement), error })
    setInProgress(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
    >
      {oneRow ? (
        <FieldsOneRow stripeOptions={stripeOptions} />
      ) : (
        <FieldsSeparated stripeOptions={stripeOptions} />
      )}
      <button type='submit' disabled={!stripe || inProgress}>
        {buttonLabel}
      </button>
    </form>
  )
}

const FieldsSeparated = ({ stripeOptions }) => {
  return (
    <>
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
    </>
  )
}

const FieldsOneRow = ({ stripeOptions }) => {
  return (
    <>
      <label>
      Card details
        {/* Events: onReady, onChange, onBlur, onFocus */}
        <CardElement
          options={stripeOptions}
        />
      </label>
    </>
  )
}

const StripeCardFormWithElements = (props) => {
  const stripePromise = loadStripe(props.stripeAppPublicKey)
  return (
    <Elements stripe={stripePromise}>
      <StripeCardFormWithoutElements
        {...props}
      />
    </Elements>
  )
}

export default StripeCardFormWithElements
