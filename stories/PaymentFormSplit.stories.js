import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import PaymentFormSplit from '../src/components/PaymentFormSplit'
import ShowResponse from '../src/helpComponents/ShowResponse'
import '../src/helpComponents/ShowResponse.css'
import '../src/components/common.css'

// import { stringArray, objectArrayWithDisabled } from './data/arrays'

const STRIPE_PUBLIC_KEY = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'

// ----- Story -----

export default {
  title: 'PaymentFormSplit'
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

      <PaymentFormSplit
        stripePublicKey={STRIPE_PUBLIC_KEY}
        onResponse={handleResponse}
      />

      <ShowResponse
        response={response}
      />
    </div>
  )
}
