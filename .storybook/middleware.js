/**
 * API mockup
 * Based on https://dev.to/mattc/how-to-mock-api-calls-in-storybook-1762
 */

const bodyParser = require('body-parser')

const expressMiddleWare = (router) => {
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use(bodyParser.json())

  router.get('/api/payments/:paymentId', (req, res) => {
    if (req.params.paymentId === 'error') {
      res.status(500).send('Something broke!')
    }
    res.send({ data: { text: 'hello world' } })
  })
}

module.exports = expressMiddleWare

console.log('\nSee API on http://localhost:6007/api/payments/123\n')
