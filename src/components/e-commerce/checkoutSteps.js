import React from 'react';
import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import '../components.css';
export default function CheckoutSteps(step1,step2,step3,step4) {
    return (
        <Nav className='justify-content-center mb-4'>
        <Nav.Item style={{borderRight:'1px solid silver'}}>
            {step1 ? (
                <LinkContainer to='/cart'>
                    <Nav.Link id="dark" style={{color:'grey'}}>Cart</Nav.Link>
                </LinkContainer>
            ) : (
                    <Nav.Link disabled>Login</Nav.Link>
                )}
        </Nav.Item>

        <Nav.Item style={{borderRight:'1px solid silver'}}>
            {step1 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link id="dark" style={{color:'grey'}}>Shipping</Nav.Link>
                </LinkContainer>
            ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
        </Nav.Item>

        <Nav.Item style={{borderRight:'1px solid silver'}}>
            {step2 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link id="dark">Payment</Nav.Link>
                </LinkContainer>
            ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
        </Nav.Item>

        <Nav.Item>
            {step2 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link id="dark">Place Order</Nav.Link>
                </LinkContainer>
            ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
        </Nav.Item>
    </Nav>
    )
}
