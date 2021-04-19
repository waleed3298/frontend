import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51HpEAFBvgj2EIc8TtM9ATlDCPhQHH5Sg0V60bqlMdRgqBrEgWuncZ5AxylBFTwRA6OZWL2XUbtvX72FIXXAK61hI00F2jZeSVF');
const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);
export default Payment;