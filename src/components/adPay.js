import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import AdCheckoutForm from './adCheckoutForm';
const stripePromise = loadStripe('pk_test_51HpEAFBvgj2EIc8TtM9ATlDCPhQHH5Sg0V60bqlMdRgqBrEgWuncZ5AxylBFTwRA6OZWL2XUbtvX72FIXXAK61hI00F2jZeSVF');
const AdPay = (props) => (
  <Elements stripe={stripePromise}>
    <AdCheckoutForm price={props.price}/>
  </Elements>
);
export default AdPay;