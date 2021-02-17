import React,{Component} from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
    baseURL : "http://127.0.0.1:4000/api"
  })

class PropertyAd extends Component{    
    render(){
        var URL = '/AdDetails/'
        return(
                <Row>
                {this.props.properties.map(property=>{
                    return(
                    <Col sm={12} md={6} lg={4}>
                    <div key={property.id}>
                    <div style={{marginBottom:'10px'}} className="ui link cards">
                      <div  className="card">
                        <div className="image">
                          <img src={property.Image}/>
                        </div>
                        <div className="content">
                          <div className="header"></div>
                          <div className="meta">
                            <a>{property.Title}</a>
                          </div>
                          <div className="description">
                            {property.Price}
                            </div>
                        </div>
                        <div className="extra content">
                          <span className="right floated">
                            {property.Date}
                          </span>
                          <span>
                            {property.Size} {property.Units}
                          </span><br/><br/>
                          <span className="mt-2">       
                    <Link to={URL+property.id}>
                    <Button style={{backgroundColor:'#34495E'}}>View Advertisement</Button>
                      </Link>
                                           
                            </span>
                        </div>
                      </div>
                    </div>
                    
                      </div>
                    </Col>
                    )
                })};
                </Row>
        )
    }
}

export default PropertyAd;