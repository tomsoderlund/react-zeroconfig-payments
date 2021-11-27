/**
 * StripePaymentForm
 * @description Note: this component uses Stripe server API, it requires backend routes.
 * @module StripePaymentForm
 * @author Tom Söderlund
 */

import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import makeRestRequest from '../../lib/makeRestRequest'

import ContactInfoForm from '../common/ContactInfoForm'
import StripeCardForm from './StripeCardForm'

const StripePaymentForm = ({
  apiPathRoot = '/api/stripe/',
  stripeAppPublicKey,
  stripeCustomerId,
  companyRequired = false,
  onResponse,
  amountDecimals,
  currency = 'usd',
  buttonLabel,
  oneRow,
  showFields
}) => {
  const [customer, setCustomer] = useState({ id: stripeCustomerId })
  const [paymentIntent, setPaymentIntent] = useState()
  const [contactInfo, setContactInfo] = useState()

  const buttonLabelFormatted = buttonLabel ? buttonLabel.replace('{amountDecimals}', amountDecimals) : undefined

  // TODO: move to CardForm?
  const createOrUpdatePaymentIntent = async (newPaymentIntent = {}) => {
    const url = paymentIntent?.id
      ? `${apiPathRoot}payment_intents/${paymentIntent.id}`
      : `${apiPathRoot}payment_intents`
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
      ? `${apiPathRoot}customers/${customer.id}`
      : `${apiPathRoot}customers`
    const results = await makeRestRequest('POST', url, newCustomer)
    setCustomer(results)
    return results
  }

  useEffect(() => {
    createOrUpdatePaymentIntent({
      amount: Math.round(amountDecimals * 100),
      currency
    })
  }, [customer?.id, amountDecimals, currency])

  const handleStartPayment = async ({ stripe, paymentMethod: newPaymentMethod, card, error }) => {
    if (error) {
      return onResponse && onResponse({ error })
    }

    // Update customer
    const { email, name } = contactInfo
    const newCustomer = await createOrUpdateCustomer({ email, name })
    if (newCustomer.id !== customer?.id) await createOrUpdatePaymentIntent({ customer: newCustomer.id })

    // Confirm payment
    const { billing_details } = newPaymentMethod // eslint-disable-line camelcase
    const results = await stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: { card, billing_details }
      }
    )
    onResponse(results)
  }

  // console.log('StripePaymentForm:', { paymentIntent, customer, currentPaymentMethod, contactInfo })

  return (
    <>
      <ContactInfoForm
        companyRequired={companyRequired}
        onChange={setContactInfo}
        showFields={showFields}
      />

      <StripeCardForm
        stripeAppPublicKey={stripeAppPublicKey}
        onResponse={handleStartPayment}
        buttonLabel={buttonLabelFormatted}
        oneRow={oneRow}
      />
    </>
  )
}

const StripePaymentFormWithElements = (props) => {
  const stripePromise = loadStripe(props.stripeAppPublicKey)
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm
        {...props}
      />
    </Elements>
  )
}

export default StripePaymentFormWithElements
