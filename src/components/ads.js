import React,{Component} from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL : "http://127.0.0.1:4000/api"
  })
  
class Posts extends Component{
    Clicked = async(id) =>{
        let data = await api.delete(`/Delete/${id}/`)
        window.location.href = '/dashboard'
      }
    
    render(){
        var URL = '/editproperty/'
        return(
            <div>
                <Row>
                {this.props.loading ? <h2>Loading...</h2> : null}
                {this.props.properties.map(property=>{
                    return(
                    <Col sm={12} md={6} lg={4}>
                    <div style={{marginBottom:'10px'}} className="ui link cards">
                      <div style={{boxShadow: '10px 10px  #D5DBDB'}}  className="card">
                        <div className="image">
                          <img alt="Property" src={property.Image}/>
                        </div>
                        <div className="content">
                          <div className="header"></div>
                          <div className="meta">
                            {property.Title}
                          </div>
                          <div className="description">
                            {property.Price}
                            </div>
                        </div>
                        <div className="extra content">
                          <span className="right floated">
                          <i className="fa fa-eye mr-2" style={{ fontSize: '1em' }} />
             {property.Views}
                          </span>
                          <span>
                            {property.Size} {property.Units}
                          </span><br/><br/>
                          <span className="mt-2">
                      <Link to={URL+property.id}>
                      <Button className="btn-md " style={{backgroundColor:'#34495E',marginLeft:'30px'}}>Edit Ad</Button>
                      </Link>
                      <Button className="btn-md mr-4" style={{backgroundColor:'#E74C3C',marginLeft:'30px'}}  onClick={()=>this.Clicked(property.id)}>Delete</Button>
                        </span>
                        </div>
                      </div>
                    </div>
                    </Col>
                    )
                })}
                </Row>
    
            </div>
        )
    }
}

export default Posts;