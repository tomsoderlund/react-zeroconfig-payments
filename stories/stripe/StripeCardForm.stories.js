import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import StripeCardForm from '../../src/components/stripe/StripeCardForm'
import ShowResponse from '../helpComponents/ShowResponse'
import '../helpComponents/ShowResponse.css'
import HelpInstructions from '../helpComponents/HelpInstructions'

// ----- Story -----

export default {
  title: 'Stripe/StripeCardForm'
}

const Template = ({ oneRow }) => {
  const [response, setResponse] = useState()

  const handleResponse = (value) => {
    action('onResponse')(value)
    setResponse(value)
  }

  return (
    <>
      <HelpInstructions />

      <StripeCardForm
        stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
        onResponse={handleResponse}
        oneRow={oneRow}
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
