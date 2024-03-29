import React, { Component } from 'react'
import Navigation from '../navbar'
import axios from 'axios';
import {withCookies} from 'react-cookie';
import {Container,Row,Col,ListGroup,Card} from 'react-bootstrap';

class OrderDetails extends Component {
    state={
        Token:this.props.cookies.get('adtoken')
    }
    componentDidMount(){
        let url = `http://127.0.0.1:4000/api/OrderDetails/${this.props.match.params.id}/`;
        axios.get(url,{
        headers:{
        'content-type':'multipart/form-data',
        'Authorization': `Token ${this.state.Token}`
      }
    }).then(res=>this.setState({order:res.data}))  
    }
    delivered = () =>{
        if(window.confirm("Are you sure you want to confirm is as delivered")){
            let form_data = new FormData();
            form_data.append('isDelivered','true');
            let url = `http://127.0.0.1:4000/api/UpdateOrder/${this.props.match.params.id}/`;
            axios.put(url,form_data,{
            headers:{
                'content-type':'multipart/form-data',
                'Authorization': `Token ${this.state.Token}`
            }
            }).then(res=>console.log(res)).catch(error=>this.setState({error:error}));
            if(!this.state.error){
            window.location.href=`/order/${this.props.match.params.id}`
            }
        }
    }
    render() {
        return (
            
        <div>
       <div><Navigation linkColor="#233443"  color="#f5f7fa" />
             <h1 className="text-center" style={{color:'#556B2F',fontFamily:'Oswald',marginTop:'5%'}}>Order Details</h1><br/>
            {this.state.order ?
            <div style={{width:'90%',position:'relative',left:'5%'}}>
                <Row>
                    <Col lg={8}><Container>
                        <p style={{fontSize:'20px'}}><b >Order ID:</b> {this.state.order._id}</p>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Payment Method:</b> {this.state.order.paymentMethod}</p>
                        <p  className="text-muted" style={{fontSize:'15px'}}><b>Total Bill:</b> Rs.{this.state.order.totalPrice}</p>
                        <p  className="text-muted" style={{fontSize:'15px'}}><b>Shipping Price:</b> Rs.{this.state.order.shippingPrice}</p>
                        <p  className="text-muted" style={{fontSize:'15px'}}><b>Tax Price:</b> Rs.{this.state.order.taxPrice}</p>
                        <Row>
                        {this.state.order.isPaid==true ?
                                        <Col md={2}>
                                        <h5><i style={{color:'green'}} className="fa fa-check-circle"></i> Paid
                                        </h5>
                                        </Col>
                                         :
                                         <Col md={2}>
                                        <h5><i style={{color:'tomato'}} className="fa fa-times mr-1"></i>
                                        Not Paid</h5>
                                        </Col>
                        }
                        {this.state.order.isDelivered==true ?
                                        <Col md={3}>
                                        <h5><i style={{color:'green'}} className="fa fa-check-circle"></i> Delivered
                                        </h5>
                                        </Col>
                                         :
                                         <Col md={3}>
                                        <h5><i style={{color:'tomato'}} className="fa fa-times"></i> Not Delivered
                                        </h5>
                                        </Col>
                                        }
                                        <Col md={3}>
                                            <button onClick={this.delivered} className="btn btn-block btn-danger">Confirm Delivered</button>
                                        </Col>
                                        </Row>
                                        
                        <br/>
                        <h4>Cart Items:</h4>
                        <ListGroup variant='flush'>
                            {this.state.order.orderItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <h6>{item.name}</h6>
                                        </Col>
                                        <Col md={3}>
                                            {item.name}
                                        </Col>

                                        <Col md={2}>
                                            Rs.{item.price}
                                        </Col>

                                        <Col md={2}>
                                            {item.qty}
                                        </Col>
                                        <Col md={3}>
                                        Rs.{item.price}*{item.qty}=<b> Rs.{item.price*item.qty}</b>
                                        </Col>
                                        
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Container></Col>
                    <Col>
                    <Card>
                    <h4 className="text-center">Shipping Details</h4>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Shipping ID:</b> {this.state.order.shippingAddress._id}</p>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Address:</b> {this.state.order.shippingAddress.address}</p>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>City:</b> {this.state.order.shippingAddress.city}</p>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Postal Code:</b> {this.state.order.shippingAddress.postalCode}</p>
                        <p className="text-muted" style={{fontSize:'15px'}}><b>Country:</b> {this.state.order.shippingAddress.country}</p>
                        </ListGroup.Item>
                    
                    </ListGroup>

                </Card>
                    </Col>
                </Row>
                
            </div>
            : null}
            
        </div>
        <div style={{textAlign:'center',width:'60%',position:'relative',left:'20%'}} className="text-center ui horizontal divider mt-4">
            Thank You for Buying
          </div>
    </div>        )
    }
}
export default withCookies(OrderDetails)