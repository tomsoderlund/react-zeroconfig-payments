import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useStripe, Elements } from '@stripe/react-stripe-js'

import ContactInfoForm from '../common/ContactInfoForm'
import StripeCardFormSplit from './StripeCardFormSplit'

const StripePaymentFormWithoutElements = ({ stripeAppPublicKey, stripePaymentIntent, companyRequired, onResponse }) => {
  const stripe = useStripe()
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(stripePaymentIntent.payment_method)
  const [currentContactInfo, setCurrentContactInfo] = useState()

  const handleContactInfoChange = (contactInfo) => {
    setCurrentContactInfo(contactInfo)
  }

  const handleCardUpdated = ({ paymentMethod, error }) => {
    if (error) {
      onResponse && onResponse({ error })
    } else {
      setCurrentPaymentMethod(paymentMethod)
    }
  }

  const handleCompletePayment = () => {
    stripe.confirmCardPayment(
      stripePaymentIntent.client_secret,
      {
        payment_method: currentPaymentMethod
      }
    )
  }

  console.log('StripePaymentForm:', { stripePaymentIntent, currentPaymentMethod, currentContactInfo })

  return (
    <div>
      <ContactInfoForm
        companyRequired={companyRequired}
        onChange={handleContactInfoChange}
      />

      <StripeCardFormSplit
        stripeAppPublicKey={stripeAppPublicKey}
        onResponse={handleCardUpdated}
      />

      <button
        type='button'
        onClick={handleCompletePayment}
      >
        Complete payment
      </button>
    </div>
  )
}

const StripePaymentFormWithElements = (props) => {
  const stripePromise = loadStripe(props.stripeAppPublicKey)
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentFormWithoutElements
        {...props}
      />
    </Elements>
  )
}

export default StripePaymentFormWithElements
