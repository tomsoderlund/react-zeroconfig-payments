import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import StripePaymentForm from '../../src/components/stripe/StripePaymentForm'
import ShowResponse from '../helpComponents/ShowResponse'
import '../helpComponents/ShowResponse.css'
import HelpInstructions from '../helpComponents/HelpInstructions'

// ----- Story -----

export default {
  title: 'Stripe/StripePaymentForm'
}

const Template = ({ oneRow, buttonLabel, showFields }) => {
  const [response, setResponse] = useState()

  const handleResponse = (response) => {
    action('onResponse')(response)
    setResponse(response)
  }

  return (
    <>
      <HelpInstructions />

      <StripePaymentForm
        stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
        amountDecimals={2.00}
        currency='eur'
        customerId='cus_JP7lD57IzN7RGC'
        companyRequired={false}
        onResponse={handleResponse}
        oneRow={oneRow}
        buttonLabel={buttonLabel}
        showFields={showFields}
      />

      <ShowResponse
        response={response}
      />
    </>
  )
}

export const Default = () => (
  <Template />
)

export const OneRow = () => (
  <Template
    oneRow
  />
)

export const OneRowWithEmail = () => (
  <Template
    oneRow
    showFields={['email']}
  />
)

export const ButtonLabel = () => (
  <Template
    buttonLabel='Pay €{amountDecimals}'
  />
)
