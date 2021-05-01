# React Zero-Config Payments

React payment components that require _zero_ configuration.

See also https://github.com/tomsoderlund/react-zeroconfig-components


## Installation

    yarn add react-zeroconfig-payments  # or: npm install react-zeroconfig-payments

### Configuration

Create an `.env` file for testing (see `.env.example`).


## Features

- Payment systems:
  - [x] Stripe
    - [ ] One-time payments
    - [ ] Recurring subscriptions
  - [ ] Paddle
  - [ ] ChargeBee
- [ ] API mockup on http://localhost:6007/api/payments/123 (see `.storybook/middleware.js`)
- Accessibility:
  - [x] All components use `button` where applicable
  - [x] Keyboard/tab support


## Components

See the Storybook stories in `/stories` to see how the components are used in code, including more advanced use cases.

### StripeCardFormOneRow

    <StripeCardFormOneRow
      {...props docs coming soon}
    />

![StripeCardFormOneRow](docs/StripeCardFormOneRow.png)

### StripeCardFormSplit

    <StripeCardFormSplit
      {...props docs coming soon}
    />

![StripeCardFormSplit](docs/StripeCardFormSplit.png)

### StripePaymentForm

    <StripePaymentForm
      {...props docs coming soon}
    />

![StripePaymentForm](docs/StripePaymentForm.png)


## Styling

Styling is optional, CSS files are included but you can also use `styled-components` or similar.

How to import CSS file, example:

    import '../node_modules/react-zeroconfig-payments/dist/StripeCardFormOneRow.css'


## Stripe

Uses https://github.com/stripe/react-stripe-js

See CodeSandbox: https://codesandbox.io/s/react-stripe-official-q1loc

### Stripe concepts

- PaymentIntent (ID prefix: `pi_`): customer’s intent to pay. Can change along the customer journey.
- PaymentMethod (ID prefix: `pm_`): e.g. a payment card.

### How to accept a payment

https://stripe.com/docs/payments/accept-a-payment

#### 1. Start payment process – create PaymentIntent (server)

https://stripe.com/docs/api/payment_intents/create

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'sek',
      // Optional:
      customer: 'cus_GoO...',
      payment_method_types: ['card'],
      receipt_email: 'jenny.rosen@example.com'
    })

Returns:

    {
      id: 'pi_1GGSK3AdCgUa7NQtInbwDOxY',
      client_secret: 'pi_1GGSK3AdCgUa7NQtInbwDOxY_secret_nwUxP04882diDN0hbumcNtCEl',
      ...
    }

Then `client_secret` is used in Step 3 below.

#### 2. Collect payment/card details – create PaymentMethod (client)

https://stripe.com/docs/js/payment_intents/create_payment_method

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement)
    })

You get a PaymentMethod object back:

    {
      id: 'pm_1GGSAd2eZvKYlo2C7DhiKkSH',
      ...
    }

#### 3. Submit the payment to Stripe (client)

https://stripe.com/docs/js/payment_intents/confirm_card_payment

    stripe.confirmCardPayment(
      clientSecret,
      {
        // OR use PaymentMethod ID:
        // payment_method: 'pm_1GGSAd2eZvKYlo2C7DhiKkSH'
        payment_method: {
          card: card,
          billing_details: {
            name: 'Jenny Rosen'
          }
        },
        // receipt_email
        // shipping
        // save_payment_method
        // setup_future_usage
        // return_url
      }
    )

### Data formats

#### billing_details

https://stripe.com/docs/api/payment_methods/create

- billing_details
  - name
  - email
  - phone
  - address
    - country (ISO code)
    - state
    - city
    - postal_code
    - line1, line2

#### Tax ID (`tax_id`)

Added **after** customer is created.

https://stripe.com/docs/api/customer_tax_ids/object#tax_id_object-type

- tax_id
  - type
  - value

### Error handling

Stripe methods return `{ error }` if something goes wrong.


## Paddle (coming later)

https://developer.paddle.com/


## ChargeBee (coming later?)


## Developing components

### Create new component

    yarn new

### How to test and preview

Preview components in Storybook:

    yarn storybook

...then open http://localhost:6007/ in your browser.

### How to build and deploy

    yarn publish  # yarn prepare (Babel) will be run automatically
