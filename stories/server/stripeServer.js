/**
 * API mockup
 * Based on https://dev.to/mattc/how-to-mock-api-calls-in-storybook-1762
 */

require('dotenv').config() // for .env config
const bodyParser = require('body-parser')
const stripe = require('stripe')(process.env.STRIPE_APP_SECRET_KEY)

// ----- Request handlers -----

const handleCreatePaymentIntent = async (req, res) => {
  const { amount } = req.body
  if (amount === undefined) throw new CustomError('No amount specified', 400)
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd'
  })
  res.send(paymentIntent)
}

// ----- Common -----

/** export default (req, res) => handleRestRequest(async (req, res) => {...}, { req, res }) */
const handleRestRequest = async function handleRestRequest (actionFunction, { req, res }) {
  try {
    await actionFunction(req, res)
  } catch (error) {
    const reference = `E${Math.round(1000 * Math.random())}`
    const { message, status = 400 } = error
    console.error(`[${reference}] Error ${status}: “${message}” –`, error)
    if (!isNaN(status)) res.status(status)
    res.json({ status, message, reference })
  }
}

/** throw new CustomError(`Account not found`, 404) */
const CustomError = class CustomError extends Error {
  constructor (message, status = 400) {
    super(message)
    if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError)
    this.status = status
  }
}

const expressMiddleWare = (router) => {
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())
  // Routes
  router.post('/api/stripe/paymentIntents', (req, res) => handleRestRequest(handleCreatePaymentIntent, { req, res }))
}

module.exports = expressMiddleWare

console.log(`\nSee mockup API on: http://localhost:6007/api/stripe\nSTRIPE_APP_PUBLIC_KEY: ${process.env.STRIPE_APP_PUBLIC_KEY}\n`)
