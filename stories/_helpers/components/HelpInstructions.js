import React from 'react'

const HelpInstructions = () => {
  return (
    <blockquote>
      Test card number: <strong>4242424242424242</strong>,
      Date: <strong>01/{(new Date()).getYear() - 100 + 1}</strong>,
      CVC: <strong>100</strong>
    </blockquote>
  )
}
export default HelpInstructions
