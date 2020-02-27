require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_APP_SECRET_KEY)

const createPaymentIntent = async function createPaymentIntent (property) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'sek',
    customer: process.env.STRIPE_CUSTOMER_ID
    // payment_method_types: ['card'],
    // receipt_email: 'jenny.rosen@example.com'
  })

  console.log('paymentIntent:', paymentIntent)
}

createPaymentIntent()
