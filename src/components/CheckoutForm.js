import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import React, {useState} from "react";
import ApiService from '../api';
import {Form,Button} from 'react-bootstrap';

const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();
// Handle real-time validation errors from the CardElement.
const handleChange = (event) => {
  if (event.error) {
    setError(event.error.message);
  } else {
    setError(null);
  }
}
// Handle form submission.
const handleSubmit = async (event) => {
  event.preventDefault();
  const card = elements.getElement(CardElement);
 
 // add these lines
  const {paymentMethod, error} = await stripe.createPaymentMethod({
     type: 'card',
     card: card
})
ApiService.saveStripeInfo({
  email, payment_method_id: paymentMethod.id})
.then(response => {
  console.log(response.data);
  localStorage.setItem('isPaid',true)
}).catch(error => {
  console.log(error)
})
};
var style = {
  base: {
    color: '#303238',
    fontSize: '16px',
    fontFamily: '"Open Sans", sans-serif',
    fontSmoothing: 'antialiased',
    '::placeholder': {
      color: '#CFD7DF',
    },
  },
  invalid: {
    color: '#e5424d',
    ':focus': {
      color: '#303238',
    },
  },
};
return (
    <div >
    <h4 className="text-center">Payment Verification</h4><br/>
    <h5>Enter you payment credentials:</h5>
  <form onSubmit={handleSubmit} className="stripe-form">
    <div className="form-row">
      <Form.Label htmlFor="email">Email Address</Form.Label>
      <Form.Control className="form-input" id="email" name="name" type="email" placeholder="abc@example.com" required 
value={email} onChange={(event) => { setEmail(event.target.value)}} />
    </div><br/>
    <div className="form-row">
      <Form.Label for="card-element">Credit or debit card</Form.Label><br/>
      <div className="card-errors mt-4" role="alert"><p style={{color:'tomato',textAlign:'left'}}>{error}</p></div>
  </div>
      <br/>
  <CardElement style={style} id="card-element" onChange={handleChange}/>
  <br/>
    <Button type="submit" className="submit-btn btn-dark">
      Submit Payment
    </Button>
  </form>
  </div>
 );
};

export default CheckoutForm;