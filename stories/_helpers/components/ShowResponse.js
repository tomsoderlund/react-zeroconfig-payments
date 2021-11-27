import React from 'react'

const ShowResponse = ({ response = {} }) => {
  if (!response || Object.keys(response).length === 0) return null
  const { paymentMethod, paymentIntent, error, id } = response
  return (
    <div
      className={'response' + (error ? ' error' : '')}
    >
      {error && error.message}
      {id && `ID: ${id}`}
      {paymentMethod && 'Credit card accepted'}
      {paymentIntent && `paymentIntent ${paymentIntent.id} ${paymentIntent.status}`}
    </div>
  )
}
export default ShowResponse
