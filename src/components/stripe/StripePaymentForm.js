import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import makeRestRequest from '../../lib/makeRestRequest'

import ContactInfoForm from '../common/ContactInfoForm'
import StripeCardFormSplit from './StripeCardFormSplit'

const StripePaymentFormWithoutElements = ({
  stripeAppPublicKey,
  customerId,
  companyRequired,
  onResponse,
  amount,
  currency = 'usd',
  buttonLabel
}) => {
  const [customer, setCustomer] = useState({ id: customerId })
  const [paymentIntent, setPaymentIntent] = useState()
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState()
  const [contactInfo, setContactInfo] = useState()

  // TODO: move to CardForm?
  const createOrUpdatePaymentIntent = async (newPaymentIntent = {}) => {
    const url = paymentIntent?.id
      ? `/api/stripe/payment_intents/${paymentIntent.id}`
      : '/api/stripe/payment_intents'
    const results = await makeRestRequest('POST', url, {
      ...(customer?.id && {
        customer: customer.id
      }),
      ...newPaymentIntent
    })
    setPaymentIntent(results)
    return results
  }

  const createOrUpdateCustomer = async (newCustomer = {}) => {
    const url = customer?.id
      ? `/api/stripe/customers/${customer.id}`
      : '/api/stripe/customers'
    const results = await makeRestRequest('POST', url, newCustomer)
    setCustomer(results)
    return results
  }

  useEffect(() => {
    createOrUpdatePaymentIntent({
      amount,
      currency
    })
  }, [customer?.id])

  useEffect(() => {
    setCurrentPaymentMethod(paymentIntent?.payment_method)
  }, [paymentIntent])

  const handleContactInfoChange = (newContactInfo) => {
    setContactInfo(newContactInfo)
  }

  const handleStartPayment = async ({ stripe, paymentMethod: newPaymentMethod, card, error }) => {
    if (error) {
      onResponse && onResponse({ error })
    } else {
      setCurrentPaymentMethod(newPaymentMethod)
    }

    // Update customer
    const { email, name } = contactInfo
    const newCustomer = await createOrUpdateCustomer({ email, name })
    if (newCustomer.id !== customer?.id) await createOrUpdatePaymentIntent({ customer: newCustomer.id })

    // Confirm payment
    const { billing_details } = newPaymentMethod // eslint-disable-line camelcase
    stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: { card, billing_details }
      }
    )
  }

  // console.log('StripePaymentForm:', { paymentIntent, customer, currentPaymentMethod, contactInfo })

  return (
    <>
      <ContactInfoForm
        companyRequired={companyRequired}
        onChange={handleContactInfoChange}
      />

      <StripeCardFormSplit
        stripeAppPublicKey={stripeAppPublicKey}
        onResponse={handleStartPayment}
        buttonLabel={buttonLabel}
      />
    </>
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
