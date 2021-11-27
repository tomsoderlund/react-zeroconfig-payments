/**
 * StripeSubscriptionForm
 * @description Note: this component uses Stripe server API, it requires backend routes.
 * @module StripeSubscriptionForm
 * @author Tom Söderlund
 */

import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import makeRestRequest from '../../lib/makeRestRequest'

import ContactInfoForm from '../common/ContactInfoForm'
import StripeCardForm from './StripeCardForm'

const StripeSubscriptionForm = ({
  apiPathRoot = '/api/stripe/',
  stripeAppPublicKey,
  stripeProductId,
  stripeCustomerId,
  companyRequired = false,
  onResponse,
  amountDecimals,
  currency = 'usd',
  interval = 'month',
  intervalCount = 1,
  buttonLabel = 'Start subscription',
  oneRow,
  showFields,
  metadata
}) => {
  const [customer, setCustomer] = useState({ id: stripeCustomerId })
  const [subscription, setSubscription] = useState()
  const [contactInfo, setContactInfo] = useState()

  const buttonLabelFormatted = buttonLabel
    ? buttonLabel.replace('{amountDecimals}', amountDecimals)
      .replace('{currency}', currency.toUpperCase())
      .replace('{interval}', interval)
      .replace('{intervalCount}', intervalCount)
    : undefined

  const createOrUpdateCustomer = async (newCustomer = {}) => {
    const url = customer?.id
      ? `${apiPathRoot}customers/${customer.id}`
      : `${apiPathRoot}customers`
    const results = await makeRestRequest('POST', url, newCustomer)
    setCustomer(results)
    return results
  }

  const createPaymentMethod = async (paymentMethod, newCustomerId) => {
    const url = `${apiPathRoot}payment_methods/${paymentMethod.id}`
    const results = await makeRestRequest('POST', url, { customer: (newCustomerId || customer.id) })
    return results
  }

  const createOrUpdateSubscription = async (newSubscription = {}) => {
    const url = subscription?.id
      ? `${apiPathRoot}subscriptions/${subscription.id}`
      : `${apiPathRoot}subscriptions`
    const results = await makeRestRequest('POST', url, {
      ...(customer?.id && {
        customer: customer.id
      }),
      ...newSubscription
    })
    setSubscription(results)
    return results
  }

  const formatSubscriptionObject = ({ newCustomer, paymentMethod }) => ({
    customer: newCustomer ? newCustomer.id : customer.id,
    items: [
      {
        price_data: {
          product: stripeProductId,
          currency,
          recurring: {
            interval,
            interval_count: intervalCount
          },
          unit_amount_decimal: amountDecimals
          // unit_amount
          // tax_behavior
        }
      }
      // quantity
      // tax_rates
    ],
    default_payment_method: paymentMethod?.id,
    metadata
  })

  const handleStartSubscription = async ({ stripe, paymentMethod, card, error }) => {
    if (error) {
      return onResponse && onResponse({ error })
    }

    // Update customer
    const { email, name } = contactInfo
    const newCustomer = await createOrUpdateCustomer({ email, name })
    // Create/attach payment method
    await createPaymentMethod(paymentMethod, newCustomer?.id)
    // Start subscription
    const results = await createOrUpdateSubscription(formatSubscriptionObject({ newCustomer, paymentMethod }))
    onResponse(results)
  }

  // console.log('StripeSubscriptionForm:', { subscription, customer, currentPaymentMethod, contactInfo })

  return (
    <>
      <ContactInfoForm
        companyRequired={companyRequired}
        onChange={setContactInfo}
        showFields={showFields}
      />

      <StripeCardForm
        stripeAppPublicKey={stripeAppPublicKey}
        onResponse={handleStartSubscription}
        buttonLabel={buttonLabelFormatted}
        oneRow={oneRow}
      />
    </>
  )
}

const StripeSubscriptionFormWithElements = (props) => {
  const stripePromise = loadStripe(props.stripeAppPublicKey)
  return (
    <Elements stripe={stripePromise}>
      <StripeSubscriptionForm
        {...props}
      />
    </Elements>
  )
}

export default StripeSubscriptionFormWithElements
