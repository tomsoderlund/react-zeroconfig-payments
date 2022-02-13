import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import { StripeMethodKlarnaForm } from '../../src/components'
import ShowResponse from '../_helpers/components/ShowResponse'
import '../_helpers/components/ShowResponse.css'

// ----- Story -----

export default {
  title: 'Stripe/StripeMethodKlarnaForm'
}

const Template = (props) => {
  const [response, setResponse] = useState()

  const handleResponse = (response) => {
    action('onResponse')(response)
    setResponse(response)
  }

  return (
    <>
      <blockquote>
        Stripe Customer ID: {props.stripeCustomerId || '(not set)'}<br />
        Contact info: {JSON.stringify(props.contactInfo, undefined, 2)}
      </blockquote>

      <StripeMethodKlarnaForm
        {...props}
        stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
        amountDecimals={99.00}
        currency='sek'
        onResponse={handleResponse}
        returnUrl='http://localhost:6007/api/klarna/return_url'
      />

      <ShowResponse
        response={response}
      />
    </>
  )
}

export const Default = () => (
  <Template
    stripeCustomerId={process.env.STRIPE_CUSTOMER_ID}
  />
)

export const CreateNewCustomer = () => (
  <Template
    contactInfo={{
      // See https://stripe.com/docs/api/payment_methods/object#payment_method_object-billing_details for all fields
      email: 'john.doe@tomorroworld.com',
      address: {
        country: 'se',
        postal_code: '11350'
      }
    }}
  />
)
