import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import { StripePaymentCardForm } from '../../src/components'
import ShowResponse from '../_helpers/components/ShowResponse'
import '../_helpers/components/ShowResponse.css'
import HelpInstructions from '../_helpers/components/HelpInstructions'

// ----- Story -----

export default {
  title: 'Stripe/StripePaymentCardForm'
}

const Template = (props) => {
  const [response, setResponse] = useState()

  const handleResponse = (response) => {
    action('onResponse')(response)
    setResponse(response)
  }

  return (
    <>
      <HelpInstructions />

      <StripePaymentCardForm
        {...props}
        stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
        stripeCustomerId={process.env.STRIPE_CUSTOMER_ID}
        amountDecimals={2.00}
        currency='eur'
        companyRequired={false}
        onResponse={handleResponse}
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
    buttonLabel='Pay {amountDecimals} {currency}'
  />
)
