# Modernist

**Modernist** is a full-stack e-commerce application built with React, Redux, Firebase, the Stripe API, Node.js and Express.

👉 [Visit the live version](https://modernist-mattrdiamond.vercel.app/), or follow the running instructions below to run locally.

![Screenshot of Modernist](/../screenshot/screenshot.jpg?raw=true)

## Details

- **Front End:** React – includes Hooks, Suspense, React Lazy, and more
- **State Management:** Redux – includes Redux Saga for asynchronous side effects and Redux Persist to cache cart data in local storage
- **Payments:** Stripe API
- **Authentication & User Accounts:** Firebase Authentication and Google Sign-In
- **Database:** Cloud Firestore
- **Back End:** Node.js and Express

## Running Instructions

- Download or Clone the Repository.
- Install all project dependencies in both the root and client folders with `yarn install`
- Add a .ENV file with your own API keys for Stripe and Unsplash
  - STRIPE_SECRET_KEY
  - UNSPLASH_ACCESS_KEY
  - UNSPLASH_SECRET
- Start the server with `yarn dev`
- Create a production build using `yarn run build`

## Payments 💳

Please use the following test credit card for payments:

- **Card Number:** 4242 4242 4242 4242
- **Expiration:** The expiration date should always be a future date
- **CVV:** 123
