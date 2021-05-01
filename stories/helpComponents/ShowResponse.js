import React from 'react'

const ShowResponse = ({ response = {} }) => {
  if (!response || Object.keys(response).length === 0) return null
  const { error, paymentMethod, paymentIntent } = response
  return (
    <div
      className={'response' + (error ? ' error' : '')}
    >
      {error && error.message}
      {paymentMethod && 'Credit card accepted'}
      {paymentIntent && `paymentIntent ${paymentIntent.id} ${paymentIntent.status}`}
    </div>
  )
}
export default ShowResponse
