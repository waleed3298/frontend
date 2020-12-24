import React,{Component} from 'react';
import Navigation from '../navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import '../components.css';
import Data from '../mapdata';
import axios from 'axios';
import MapDetail from './detailmap';
import Button from 'react-bootstrap/Button';
import Footer from '../footer';
import Views from './addViews';
import {withCookies} from 'react-cookie';

class PropertyDetails extends Component{
    state = {
        flag:false,
        saved:false,
        error:'',
        token:this.props.cookies.get('ad-token'),
      }
      getDetails = () =>{
        const { handle } = this.props.match.params
        fetch(`http://127.0.0.1:4000/api/AD/${handle}/`,{
            method : 'GET'
            }).then(resp=>resp.json()).then(res=>this.setState({res})).catch(error=>console.log(error));
      }
      componentDidMount () {
       this.getDetails();
       this.setState({flag:true})
       }
       handleClick = (e) =>{
         e.preventDefault();
         let form_data = new FormData();
         form_data.append('Ad',this.state.res.id);
         form_data.append('Title',this.state.res.Title);
         form_data.append('Price',this.state.res.Price);
         form_data.append('Image',this.state.res.Image);
         let url = 'http://127.0.0.1:4000/api/Like/'
         axios.post(url,form_data,{
          headers:{
            'content-type':'multipart/form-data',
            'Authorization': `Token ${this.state.token}`
          }
        }).then(res=>console.log(res)).catch(error=>this.setState({error:error}));
        this.setState({saved:true})
       }
        
      render() {
          const properties = [this.state.Property]
        return(
            <div>
            <Navigation link1="Map" link2="Houses" link3="Plots" link4="Commercial" color="#34495E" />
            <br />
            {this.state.res ? 
            <div className="mt-4" style={{backgroundColor:'white',padding:'0 30px 0',width:'80%',position:'relative',left:'10%',right:'10%',boxShadow: '10px 10px  #D5DBDB'}}>
            <h1 className="mb-3" style={{textAlign:'center',fontFamily:'Lora',marginBottom:'50px',paddingTop:'20px'}}>Property Details</h1><br/><br/>
            <Row>
            <Col lg={6} sm={12}>
                <Image width="100%" height="100%" style={{borderRight:'1px solid grey'}} src={this.state.res.Image}></Image>
            </Col>
            <Col lg={6} sm={12}>
                <h4 style={{fontFamily:'Lora'}}>Title: {this.state.res.Title}</h4><hr/>    
                <h6 style={{fontFamily:'Lora'}}>Price: {this.state.res.Price}</h6><hr/>
                <h6 style={{fontFamily:'Lora'}}>City: {this.state.res.City}</h6><hr />
                <h6 style={{fontFamily:'Lora'}}>Location: {this.state.res.Location}</h6><hr />
                <h6 style={{fontFamily:'Lora'}}>Type: {this.state.res.Type}</h6><hr />
            </Col><br/>
            <div className="mt-3" style={{fontFamily:'Lora'}}>
            <h6><b>Description:</b> </h6>
            <Col lg={12} sm={12}>
                <h6>{this.state.res.Description}</h6>
            </Col>
            </div><br/>
            <h6><b>Property Images:</b> </h6>
            {this.state.res.Image1!=null ?
            <div style={{width:'80%',position:'relative',height:'40%',marginTop:'10%',marginBottom:'10%'}}>
            <Carousel>
  {this.state.res.Image1!=null ? 
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={this.state.res.Image1}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Front View</h3>
    </Carousel.Caption>
  </Carousel.Item>
  : null}
  {this.state.res.Image2!=null ? 
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={this.state.res.Image2}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Backside View</h3>
    </Carousel.Caption>
  </Carousel.Item>
  : null}
  {this.state.res.Image3!=null? 
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={this.state.res.Image3}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Interior</h3>
    </Carousel.Caption>
  </Carousel.Item>
  : null}
  {this.state.res.Image4!=null? 
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={this.state.res.Image4}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Kitchen</h3>
    </Carousel.Caption>
  </Carousel.Item>
  :null}
  {this.state.res.Image5!=null? 
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={this.state.res.Image5}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Bedrooms</h3>
    </Carousel.Caption>
  </Carousel.Item>
  :null}
</Carousel>
            </div>
           : <h3 style={{width:'60%',position:'relative',left:'20%'}}>No Images</h3>}
            <div className="mt-3" style={{fontFamily:'Lora'}}>
            <h6><b>Details:</b> </h6>
            <Col lg={12} sm={12}>
                <h6>Bedrooms: {this.state.res.Beds}</h6>
                <h6>Baths: {this.state.res.Baths}</h6>
                <h6>Purpose: For {this.state.res.Purpose}</h6>
                <h6>Price: {this.state.res.Price}</h6>
                <h6>Size: {this.state.res.Size} {this.state.res.Units}</h6>
            <h6>Construction Status: {this.state.res.Construction_status}</h6>
            </Col><br/>
            <Col lg={12}>
            <h6><b>Location on Map</b> </h6><br/><br/>
            <MapDetail width="65vw" height="65vh" data={this.state.res} />
            </Col><br/><br/>
            <Col lg={12}>
            <Views data={this.state.res} />
            </Col>
            {this.state.saved===false ? 
            <Button className="ml-3" style={{backgroundColor:'#34495E'}} onClick={this.handleClick}><i className="fa fa-heart"></i>  Save Property</Button>
            :
            this.state.error ? <h6>Saved Already</h6> : 
            <Button className="ml-3" style={{backgroundColor:'#34495E'}} ><i className="fa fa-check"></i>  Saved </Button>
            } 
            </div>
            </Row><br/><br/>
            </div>
            : null }<br/><br/>
            <Footer />
            </div>
        )
      }
    }



export default withCookies(PropertyDetails);

