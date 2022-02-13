import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import { StripePaymentKlarnaForm } from '../../src/components'
import ShowResponse from '../_helpers/components/ShowResponse'
import '../_helpers/components/ShowResponse.css'

// ----- Story -----

export default {
  title: 'Stripe/StripePaymentKlarnaForm'
}

const Template = (props) => {
  const [response, setResponse] = useState()

  const handleResponse = (response) => {
    action('onResponse')(response)
    setResponse(response)
  }

  return (
    <>
      <StripePaymentKlarnaForm
        {...props}
        stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
        amountDecimals={99.00}
        currency='sek'
        countryCode='se'
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
    countryCode='se'
  />
)
