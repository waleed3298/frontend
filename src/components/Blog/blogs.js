import React, { Component } from 'react'
import Navigation from '../navbar';
import {Row,Col,Image,Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { withCookies } from 'react-cookie';

class Blogs extends Component {
    state={
        Blogs:[],
        token:this.props.cookies.get('adtoken')
    }       
    getBlogs = () =>{
        fetch("http://127.0.0.1:4000/api/Blogs/",{
              method : 'GET',
              headers:{
                'Authorization':`Token ${this.state.token}`
              }
              }).then(resp=>resp.json()).then(res=>this.setState({Blogs:res})).catch(error=>console.log(error));
      
    }
    componentDidMount(){
        this.getBlogs()
    }
    render() {
        return (
            <div>
                  <Navigation linkColor="#233443"  color="#f5f7fa" />
                  <h1 style={{marginTop:'5%',fontFamily:'Lora',textAlign:'center',fontWeight:'bold'}}>e-Real Estate Blogs</h1><br/>
          {this.state.Blogs.length!=0 ? 
                    <Row style={{marginLeft:'2%'}}>
                {this.state.Blogs.map(blog=>{
                    console.log(blog)
                    return(
                        <Col lg={3} md={6} sm={12}>
                        <div className="card">
                        <Card className="">
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
                 <h6>   {blog.genre}</h6>
                </Card.Text>
            </Card.Body>
        </Card>
                        </div>
                    </Col>
                    )
                })}
                </Row> : null}
            </div>
        )
    }
}
export default withCookies(Blogs);