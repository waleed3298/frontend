import React,{useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Navigation from '../navbar';
import {saveShippingAddress} from '../../actions/cartActions';
import CheckoutSteps from './checkoutSteps';

export default function Shipping({history}) {
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    const [address,setAddress] = useState(shippingAddress.address);
    const [city,setCity] = useState(shippingAddress.city);
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode);
    const [country,setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch()
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        <div style={{backgroundColor:'#f5f7fa',height:'100vh'}}><Navigation linkColor="#233443"  color="#fcfbff" />    <div style={{marginTop:'5%'}}>
         <CheckoutSteps step3 />
     <div style={{width:'70%',position:'relative',left:'12.5%',top:'10%'}}>
        <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='dark'>
                    Continue
                </Button>
            </Form>
        </div>
        </div>
</div>        
    )
}
