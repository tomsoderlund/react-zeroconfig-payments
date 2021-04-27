import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import '../styles.css'
import CardFormSplit from '../../src/components/stripe/CardFormSplit'
import ShowResponse from '../helpComponents/ShowResponse'
import '../helpComponents/ShowResponse.css'

// import { stringArray, objectArrayWithDisabled } from './data/arrays'

const STRIPE_APP_PUBLIC_KEY = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'

// ----- Story -----

export default {
  title: 'Stripe/CardFormSplit'
}

export const SplitForm = () => {
  const [response, setResponse] = useState()

  const handleResponse = (value) => {
    action('onResponse')(value)
    setResponse(value)
  }

  return (
    <div>
      <p>Test card number: 4242424242424242</p>

      <CardFormSplit
        stripeAppPublicKey={STRIPE_APP_PUBLIC_KEY}
        onResponse={handleResponse}
      />

      <ShowResponse
        response={response}
      />
    </div>
  )
}