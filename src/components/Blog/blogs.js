import React, { Component } from 'react'
import Navigation from '../navbar';
import {Row,Col,Image,Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class blogs extends Component {
    state={
        Blogs:[]
    }       
    getBlogs = () =>{
        if(this.state.token){
        fetch("http://127.0.0.1:4000/api/Blogs/",{
              method : 'GET',
              headers:{
                'Authorization':`Token ${this.state.token}`
              }
              }).then(resp=>resp.json()).then(res=>this.setState({Blogs:res})).catch(error=>console.log(error));
      }
      else{
        window.location.href = '/login'
      }
    }
    render() {
        return (
            <div>
                <Navigation linkColor="white" color="#556B2F" />
                <Row>
                {this.state.Blogs.map(blog=>{
                    console.log(blog)
                    return(
                        <Col lg={3} md={6} sm={12}>
                        <div className="card">
                        <Card className="my-3 p-3 rounded">
            <Link to={`/Blog/${blog.id}`}>
                <Card.Img src={blog.Title_image} />
            </Link>
            <Card.Body>
                <Link to={`/Blog/${blog.id}`}>
                    <Card.Title as="div">
                        <strong>{blog.Title}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="h3">
                    ${blog.genre}
                </Card.Text>
            </Card.Body>
        </Card>
                        </div>
                    </Col>
                    )
                })}
                </Row>
            </div>
        )
    }
}
