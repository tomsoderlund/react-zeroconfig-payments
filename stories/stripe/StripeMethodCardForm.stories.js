import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import { StripeMethodCardForm } from '../../src/components'
import ShowResponse from '../_helpers/components/ShowResponse'
import '../_helpers/components/ShowResponse.css'
import HelpInstructions from '../_helpers/components/HelpInstructions'

// ----- Story -----

export default {
  title: 'Stripe/StripeMethodCardForm'
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

      <StripeMethodCardForm
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
