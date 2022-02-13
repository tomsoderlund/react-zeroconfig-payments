import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import { StripeSubscriptionCardForm } from '../../src/components'
import ShowResponse from '../_helpers/components/ShowResponse'
import '../_helpers/components/ShowResponse.css'
import HelpInstructions from '../_helpers/components/HelpInstructions'

// ----- Story -----

export default {
  title: 'Stripe/StripeSubscriptionCardForm'
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

      <StripeSubscriptionCardForm
        {...props}
        stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
        stripeProductId={process.env.STRIPE_PRODUCT_ID}
        stripeCustomerId={process.env.STRIPE_CUSTOMER_ID}
        interval='month'
        intervalCount={3}
        amountDecimals={9.90}
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

export const ExistingPriceID = () => (
  <Template
    stripePriceId={process.env.STRIPE_PRICE_ID}
    metadata={{ comment: 'ExistingPriceID' }}
  />
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
    buttonLabel='Pay {amountDecimals} {currency} every {intervalCount} {interval}(s)'
  />
)
