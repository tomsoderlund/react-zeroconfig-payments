// https://stripe.com/docs/js/elements_object/create_element?type=card#elements_create-options
export default {
  style: {
    base: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: 'dodgerblue',
      fontFamily: '"Helvetica Neue", sans-serif',
      '::placeholder': {
        color: 'lightgray'
      }
    },
    invalid: {
      color: 'tomato'
    }
  }
}
