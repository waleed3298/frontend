import React,{Component} from 'react';
import Navigation from './navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import {withCookies} from 'react-cookie';
import {Link} from 'react-router-dom';
import Footer from './footer';
import Image from 'react-bootstrap/Image';

const api = axios.create({
  baseURL : "http://127.0.0.1:4000/api"
})

class Dashboard extends Component{
  
  state={
        postsPerPage : 10,
        currentPage : 1,
        properties:[],
        profile:[],
        selectedProperty :  null,
        token : this.props.cookies.get('ad-token')
    }
    getProfiles = () =>{
      fetch("http://127.0.0.1:4000/api/profile/",{
            method : 'GET',
            headers:{
              'Authorization':`Token ${this.state.token}`
            }
            }).then(resp=>resp.json()).then(res=>this.setState({profile:res})).catch(error=>console.log(error));
    
    }
    getAds = () =>{
      if(this.state.token){
      fetch("http://127.0.0.1:4000/api/dashboard/",{
            method : 'GET',
            headers:{
              'Authorization':`Token ${this.state.token}`
            }
            }).then(resp=>resp.json()).then(res=>this.setState({properties:res})).catch(error=>console.log(error));
         }
    else{
      window.location.href = '/login'
    }
  }

    componentDidMount(){
    this.getProfiles();
    this.getAds();
    
  }

    Clicked = async(id) =>{
      let data = await api.delete(`/Delete/${id}/`)
      this.getAds();
    }
    
    render(){
      var URL = '/editproperty/'
        return(
            <div id="wrapper">
            <Navigation  color="#34495E" />
            {this.state.profile.map(data=>
            <div style={{width:'60%',position:'relative',left:'0%',right:'40%'}}>
            <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
            <Image src={data.image}></Image>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h4>Name:{data.name}</h4><br/>
              <h6>Age:{data.Age}</h6><br/>
              <h6>Contact:{data.contact_no}</h6><br/>
            </div>
            </div>
            </div>
            )}
            <div style={{width:'60%',position:'relative',left:'20%',right:'20%'}}>
            <Row>
                {this.state.properties.map(property=>{
                    return(
                    <Col sm={12} md={6} lg={4}>
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
                      <Button className="btn-sm ml-3 mr-3" style={{backgroundColor:'#34495E',marginLeft:'30px'}}>Edit Ad</Button>
                      </Link>
                      <Button className="btn-sm ml-3 mr-3" style={{backgroundColor:'#E74C3C',marginLeft:'30px'}}  onClick={()=>this.Clicked(property.id)}>Delete</Button>
                            </span>
                        </div>
                      </div>
                    </div>
                    </Col>
                    )
                })};
                </Row>
                </div>
                <Footer />
            </div>
        );
    };
};

export default withCookies(Dashboard);

                      





