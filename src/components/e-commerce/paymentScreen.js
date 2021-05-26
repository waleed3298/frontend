import React, { useState, useEffect } from 'react'
import { Form, Button, Col,Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from './checkoutSteps'
import { savePaymentMethod } from '../../actions/cartActions'
import Payment from '../payment';
import Navigation from '../navbar';
import Message from '../message';
function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [form,setForm] = useState(false)
    const dispatch = useDispatch()
    const Clicked = () =>{
        setForm(true)
    }
    const show = () =>{
        setForm(false)
    }
    const [paymentMethod, setPaymentMethod] = useState('')
    const [stripe,setStripe] = useState('')
    if (!shippingAddress.address) {
        history.push('/shipping')
    }
    const isPaid = localStorage.getItem('isPaid') 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        window.location.href = '/placeorder'
    }
    return (
        <div style={{backgroundColor:'#f5f7fa',height:'100vh'}}><Navigation linkColor="#233443"  color="#fcfbff" />
            
        <div style={{width:'80%',position:'relative',left:'10%',top:'8%'}}>
            <CheckoutSteps step3 />
            <Row style={{marginTop:'8%'}}>
                <Col lg={3} md={3} style={{borderRight:'1px solid silver'}}>
                <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label style={{textAlign:'center'}} as='legend'>Select Method</Form.Label><br/>
                    <Col style={{marginTop:'5%'}}>
                        <Form.Check
                            type='radio'
                            label='Debit or Credit Card'
                            id='Debit'
                            name='paymentMethod'
                            value="Debit"
                            onClick={Clicked}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check><br/>
                    
                        <Form.Check
                            type='radio'
                            label='Cash On Delivery'
                            id='Delivery'
                            name='paymentMethod'
                            value="Delivery"
                            onClick={show}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button className="btn btn-block mt-3" type='submit' variant='dark'>
                    Continue
                </Button>
            </Form>
            
                </Col>
                <Col>
                {form ?  <Payment  /> : null}
               
                </Col>
            </Row>
            </div>
            </div>
    )
}

export default PaymentScreen
