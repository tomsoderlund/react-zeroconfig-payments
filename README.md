# React Zero-Config Payments

React payment components that require _zero_ configuration.

See also https://github.com/tomsoderlund/react-zeroconfig-components

## Design goals

- “Plug and play” Stripe integration
- VAT/tax compliant with European standards
- Simple backend requirements – basically just mirror Stripe’s API


## Features

- Payment systems:
  - [x] Stripe
    - [x] One-time payments
      - [ ] Minimal form for returning customers
    - [ ] Recurring subscriptions
    - [x] UX: Select either “one row” or “split fields” layout (merge StripeCardForm*)
    - [ ] [VAT numbers](https://stripe.com/docs/api/customer_tax_ids/create?lang=node)
  - [ ] Paddle
  - [ ] ChargeBee
- [x] API mockup on http://localhost:6007/api/stripe (see [“Example server backend”](#example-server-backend) below)
- Accessibility:
  - [x] All components use `button` where applicable
  - [x] Keyboard/tab support


## Installation

    yarn add react-zeroconfig-payments  # or: npm install react-zeroconfig-payments

### Configuration

Create an `.env` file for testing (see `.env.example`).

### Set up server routes

Required routes for `StripePaymentForm`:

- POST `/api/stripe/payment_intents`
- POST `/api/stripe/payment_intents/:id`
- POST `/api/stripe/customers`
- POST `/api/stripe/customers/:id`

See [“Example server backend”](#example-server-backend) below.


## Components

See the Storybook stories in `/stories` to see how the components are used in code, including more advanced use cases.

### StripePaymentForm

*Note:* this component uses Stripe server API, it requires backend routes.

    <StripePaymentForm
      stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
      amountDecimals={9.90}
      currency='eur'
      onResponse={handleResponse}
    />

![StripePaymentForm](docs/StripePaymentForm.png)

### StripeCardForm

This component is client-side only, does not require backend routes.

    <StripeCardForm
      stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
      onResponse={handleResponse}
    />

![StripeCardForm](docs/StripeCardForm.png)

### StripeCardForm: oneRow

    <StripeCardForm
      oneRow={true}
      stripeAppPublicKey={process.env.STRIPE_APP_PUBLIC_KEY}
      onResponse={handleResponse}
    />

![StripeCardForm: oneRow](docs/StripeCardFormOneRow.png)


## Example server backend

    curl -X POST -H 'Content-type: application/json' --data '{ "amount": 100 }' http://localhost:6007/api/stripe/payment_intents

See the source code in `stories/server/stripeServer.js`


## Styling

Styling is optional, you can use `styled-components` or similar.


## Developing components

### Create new component

    yarn new

### How to test and preview

Preview components in Storybook:

    yarn storybook

...then open http://localhost:6007/ in your browser.

### How to build and publish a new NPM package

    yarn publish  # yarn prepare (Babel) will be run automatically
