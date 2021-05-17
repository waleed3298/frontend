import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from './rating'
import Loader from '../loader';
import Message from '../message';
import axios from 'axios';
import Navigation from '../navbar';
import {useCookies} from 'react-cookie';
import { listProductDetails,listProductReviews } from '../../actions/productActions';

function ItemDetail({ props, match, history }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [name,setName] = useState('')
    const [reviews,setReviews] = useState([])
    const [reviewError, setReviewError] = useState([])
    const [cookies,setCookies] = useCookies(['adtoken'])
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(listProductDetails(match.params.id));
        let url = `http://127.0.0.1:4000/api/Rating/${match.params.id}/`;
        axios.get(url,{
        headers:{
        'content-type':'multipart/form-data',
      }
    }).then(res=>setReviews(res.data));
            }
    ,[])
    const handleChange = (event) =>{
        const value = event.target.value;
       this.setState({
         [event.target.name]: value
       });
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('Product',match.params.id);
        form_data.append('Name',name);
        form_data.append('Rating',rating);
        form_data.append('Comment',comment);
        let url = 'http://127.0.0.1:4000/api/CreateRating/';
        axios.post(url,form_data,{
          headers:{
            'content-type':'multipart/form-data',
            'Authorization': `Token ${cookies.adtoken}`
          }
        }).then(res=>console.log(res)).catch(error=>setReviewError(error))
        if (reviewError){
            console.log(reviewError)
        }
        else{
            window.location.href = `http://127.0.0.1:3000/product/${match.params.id}/`
        }

      }
      
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const addToCart = () =>{
        window.location.href=`http://localhost:3000/cart/${match.params.id}?qty=${qty}`
    }
    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate

    return (
        <div>
<Navigation linkColor="white"  color="#556B2F" />
                    <div style={{width:'90%',position:'relative',left:'5%'}}>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={product.avg_rating} text={`${product.no_of_reviews} reviews`} color={'#f8e825'} />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <b>Price:</b> ${product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <b>Description:</b> {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCart}
                                                    className='btn-block btn-dark'
                                                    disabled={product.countInStock == 0}
                                                    type='button'>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    
                                    <ListGroup variant='flush'>
                                        {reviews ?
                                            reviews.map((review) => {
                                            return(
                                            <ListGroup.Item key={review._id}>
                                                <h5>{review.Name}</h5>
                                                <Rating value={review.Rating} color='#f8e825' />
                                                <p>{review.CreatedAt.substring(0, 10)}</p>
                                                <p  style={{fontSize:'15px'}}>{review.Comment}</p>
                                            </ListGroup.Item>
                                            )}):null}

                                        <ListGroup.Item>
                                            <h4>Write a review</h4>

                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                                <Form >
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Label>Name:</Form.Label>
                                                    <Form.Control size="md" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" /><br/>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='dark'
                                                        onClick={handleSubmit}
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )

            }
        </div ></div>
    )
}

export default ItemDetail;