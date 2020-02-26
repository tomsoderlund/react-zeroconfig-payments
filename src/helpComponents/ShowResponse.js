import React from 'react'

const ShowResponse = ({ response = {} }) => {
  const { error, paymentMethod } = response
  if (!(error || paymentMethod)) return null
  return (
    <div
      className={'response' + (error ? ' error' : '')}
    >
      {error && error.message}
      {paymentMethod && 'Credit card accepted'}
    </div>
  )
}
export default ShowResponse
