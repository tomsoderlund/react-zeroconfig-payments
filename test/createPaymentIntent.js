const STRIPE_SECRET_KEY = 'sk_test_Msc3LMNCgrUl9IuIk9p3jKzA00b6oqmFCo'

const stripe = require('stripe')(STRIPE_SECRET_KEY)

const createPaymentIntent = async function createPaymentIntent (property) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'sek',
    payment_method_types: ['card'],
    receipt_email: 'jenny.rosen@example.com'
  })

  console.log('paymentIntent:', paymentIntent)
}

createPaymentIntent()
