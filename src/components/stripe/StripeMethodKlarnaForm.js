/**
 * StripeMethodKlarnaForm
 * @description Payment method input for Klarna. Note: this component uses Stripe server API, it requires backend routes.
 * @module StripeMethodKlarnaForm
 * @author Tom Söderlund
 */

import React, { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'

import makeRestRequest from '../lib/makeRestRequest'

const StripeMethodKlarnaForm = ({
  apiPathRoot = '/api/stripe/',
  stripeAppPublicKey,
  stripeCustomerId,
  contactInfo,
  amountDecimals,
  currency = 'usd',
  buttonLabel = 'Pay with Klarna',
  onResponse,
  returnUrl
}) => {
  const [customer, setCustomer] = useState({ id: stripeCustomerId })
  const [paymentIntent, setPaymentIntent] = useState()

  // Initialize Stripe SDK
  const [stripe, setStripe] = useState()
  useEffect(
    async () => setStripe(await loadStripe(stripeAppPublicKey)),
    [stripeAppPublicKey]
  )

  const buttonLabelFormatted = buttonLabel
    ? buttonLabel.replace('{amountDecimals}', amountDecimals)
      .replace('{currency}', currency.toUpperCase())
    : undefined

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

  const handleStartPayment = async () => {
    // Update customer
    const newCustomer = await createOrUpdateCustomer(contactInfo)
    // If customer has changed, create/update the PaymentIntent
    if (newCustomer.id !== customer?.id) await createOrUpdatePaymentIntent({ customer: newCustomer.id })

    // Confirm payment with Klarna: redirects away from the client
    const results = await stripe.confirmKlarnaPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          billing_details: contactInfo
        },
        return_url: returnUrl
      }
    )

    onResponse(results)
  }

  // console.log('StripeMethodKlarnaForm:', paymentIntent?.id, { paymentIntent, customer, contactInfo })

  return (
    <>
      <button
        onClick={handleStartPayment}
      >
        {buttonLabelFormatted}
      </button>
    </>
  )
}

export default StripeMethodKlarnaForm
