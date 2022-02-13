/**
 * StripePaymentKlarnaForm
 * @description One-time payments for Klarna. Note: this component uses Stripe server API, it requires backend routes.
 * @module StripePaymentKlarnaForm
 * @author Tom Söderlund
 */

import React, { useState } from 'react'

import ContactInfoForm from '../common/ContactInfoForm'
import StripeMethodKlarnaForm from './StripeMethodKlarnaForm'

const StripePaymentKlarnaForm = (props) => {
  const { showFields = ['email'], ...otherProps } = props
  const [contactInfo, setContactInfo] = useState()

  // console.log('StripePaymentKlarnaForm:', paymentIntent?.id, { paymentIntent, customer, contactInfo })

  return (
    <>
      <ContactInfoForm
        onChange={setContactInfo}
        showFields={showFields}
      />

      <StripeMethodKlarnaForm
        {...otherProps}
        contactInfo={contactInfo}
      />
    </>
  )
}

export default StripePaymentKlarnaForm
