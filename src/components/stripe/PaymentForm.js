import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useStripe, Elements } from '@stripe/react-stripe-js'

import ContactInfoForm from '../common/ContactInfoForm'
import CardFormSplit from './CardFormSplit'

const PaymentFormWithoutElements = ({ stripeAppPublicKey, stripePaymentIntent, companyRequired, onResponse }) => {
  const stripe = useStripe()
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(stripePaymentIntent.payment_method)
  const [currentBillingDetails, setCurrentBillingDetails] = useState()

  const handleContactInfoChange = (contactInfo) => {
    setCurrentBillingDetails(contactInfo)
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

  console.log('PaymentForm:', { stripePaymentIntent, currentPaymentMethod, currentBillingDetails })

  return (
    <div>
      <ContactInfoForm
        companyRequired={companyRequired}
        onChange={handleContactInfoChange}
      />

      <CardFormSplit
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

const PaymentFormWithElements = (props) => {
  const stripePromise = loadStripe(props.stripeAppPublicKey)
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormWithoutElements
        {...props}
      />
    </Elements>
  )
}

export default PaymentFormWithElements
