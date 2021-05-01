/**
 * API mockup
 * Based on https://dev.to/mattc/how-to-mock-api-calls-in-storybook-1762
 */

require('dotenv').config() // for .env config
const bodyParser = require('body-parser')
const stripe = require('stripe')(process.env.STRIPE_APP_SECRET_KEY)

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

// ----- Routes -----

const stripeMockupServerHandler = (router) => {
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())

  // payment_intents – https://stripe.com/docs/api/payment_intents
  router.post('/api/stripe/payment_intents', (req, res) => handleRestRequest(
    async (req, res) => res.send(await stripe.paymentIntents.create(req.body)), { req, res }
  ))
  router.post('/api/stripe/payment_intents/:id', (req, res) => handleRestRequest(
    async (req, res) => res.send(await stripe.paymentIntents.update(req.params.id, req.body)), { req, res }
  ))
  router.post('/api/stripe/payment_intents/:id/:action', (req, res) => handleRestRequest(
    async (req, res) => res.send(await stripe.paymentIntents[req.params.action](req.body)), { req, res }
  ))

  // customers – https://stripe.com/docs/api/customers
  router.post('/api/stripe/customers', (req, res) => handleRestRequest(
    async (req, res) => res.send(await stripe.customers.create(req.body)), { req, res }
  ))
  router.post('/api/stripe/customers/:id', (req, res) => handleRestRequest(
    async (req, res) => res.send(await stripe.customers.update(req.params.id, req.body)), { req, res }
  ))
  router.delete('/api/stripe/customers/:id', (req, res) => handleRestRequest(
    async (req, res) => res.send(await stripe.customers.delete(req.params.id)), { req, res }
  ))
}

module.exports = stripeMockupServerHandler

console.log(`\nSee mockup API on: http://localhost:6007/api/stripe\nSTRIPE_APP_PUBLIC_KEY: ${process.env.STRIPE_APP_PUBLIC_KEY}\n`)
