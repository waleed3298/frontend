import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../message'
import Navigation from '../navbar';
import {useCookies} from 'react-cookie';
import axios from 'axios';
export default function OrdersList() {
    const [orders,setOrders] = useState([])
    const [cookies,setCookies] = useCookies(['adtoken'])
        
    useEffect(()=>{
        let url = `http://127.0.0.1:4000/api/orders/myorders/`;
        axios.get(url,{
        headers:{
        'content-type':'multipart/form-data',
        'Authorization': `Token ${cookies.adtoken}`
      }
    }).then(res=>setOrders(res.data))  
    
    },[])
        return (
            <div><Navigation linkColor="#233443"  color="#f5f7fa" />
            <h1 style={{marginTop:'5%'}} className="text-center mb-4"><i className="fa fa-shopping-cart"></i> Your Orders</h1>
                <br/>
                {orders.length>0 ?
                    <ListGroup variant='flush' style={{width:'80%',position:'relative',left:'10%'}}>
                            {orders.map(order => (
                                <ListGroup.Item key={order._id}>
                                    <Row>
                                    
                                    <Col md={2}>
                                        <b>Order No:</b> {order._id}
                                        </Col>

                                        <Col md={2}>
                                            {order.createdAtDate}
                                        </Col>

                                        <Col md={2}>
                                            ${order.totalPrice}
                                        </Col>
                                        {order.isPaid==true ?
                                            <Col md={1}>
                                        <h6>Paid: <i style={{color:'green'}} class="fa fa-check-circle"></i>
                                        </h6>
                                        </Col>
                                         :
                                         <Col md={1}>
                                        <h6>Paid: <i style={{color:'tomato'}} class="fa fa-times"></i>
                                        </h6>
                                        </Col>
                                        }
                                        {order.isDelivered==true ?
                                            <Col md={2}>
                                        <h6>Delivered: <i style={{color:'green'}} class="fa fa-check-circle"></i>
                                        </h6>
                                        </Col>
                                         :
                                         <Col md={2}>
                                        <h6>Delivered: <i style={{color:'tomato'}} class="fa fa-times"></i>
                                        </h6>
                                        </Col>
                                        }
                                        
                                        <Col md={3}>
                                        <Link to={`/order/${order._id}`} >
                                            <Button
                                                type='button'
                                                variant='light'
                                                className="btn btn-md mb-3"
                                            >
                                                View Order Details
                                            </Button></Link>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        :null}
            </div>
        )
    }
