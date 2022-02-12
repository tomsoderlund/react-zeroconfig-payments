/**
 * StripeKlarnaPaymentForm
 * @description Note: this component uses Stripe server API, it requires backend routes.
 * @module StripeKlarnaPaymentForm
 * @author Tom Söderlund
 */

import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'

import makeRestRequest from '../lib/makeRestRequest'

import ContactInfoForm from '../common/ContactInfoForm'

const StripeKlarnaPaymentForm = ({
  apiPathRoot = '/api/stripe/',
  stripeAppPublicKey,
  stripeCustomerId,
  onResponse,
  returnUrl,
  amountDecimals,
  currency = 'usd',
  buttonLabel = 'Pay with Klarna',
  showFields = ['email']
}) => {
  const [customer, setCustomer] = useState({ id: stripeCustomerId })
  const [paymentIntent, setPaymentIntent] = useState()
  const [contactInfo, setContactInfo] = useState()

  const buttonLabelFormatted = buttonLabel
    ? buttonLabel.replace('{amountDecimals}', amountDecimals)
      .replace('{currency}', currency.toUpperCase())
    : undefined

  // TODO: move to CardForm?
  const createOrUpdatePaymentIntent = async (newPaymentIntent = {}) => {
    const url = paymentIntent?.id
      ? `${apiPathRoot}payment_intents/${paymentIntent.id}`
      : `${apiPathRoot}payment_intents`
    const results = await makeRestRequest('POST', url, {
      ...(customer?.id && {
        customer: customer.id
      }),
      payment_method_types: ['klarna'],
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

  const [stripe, setStripe] = useState()
  useEffect(
    async () => setStripe(await loadStripe(stripeAppPublicKey)),
    [stripeAppPublicKey]
  )

  const handleStartPayment = async () => {
    // Update customer
    const { email, name } = contactInfo
    const newCustomer = await createOrUpdateCustomer({ email, name })
    if (newCustomer.id !== customer?.id) await createOrUpdatePaymentIntent({ customer: newCustomer.id })

    // Confirm payment with Klarna: redirects away from the client
    const results = await stripe.confirmKlarnaPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          billing_details: {
            email,
            address: {
              country: newCustomer?.address?.country
            }
          }
        },
        return_url: returnUrl
      }
    )

    onResponse(results)
  }

  console.log('StripeKlarnaPaymentForm:', paymentIntent?.id, { paymentIntent, customer, contactInfo })

  return (
    <>
      <ContactInfoForm
        onChange={setContactInfo}
        showFields={showFields}
      />

      <button
        onClick={handleStartPayment}
      >
        {buttonLabelFormatted}
      </button>
    </>
  )
}

export default StripeKlarnaPaymentForm
