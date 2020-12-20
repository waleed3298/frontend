import React,{Component} from 'react';
import Navigation from '../navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../components.css';
import Data from '../mapdata';
import axios from 'axios';
import MapDetail from './detailmap';
import Button from 'react-bootstrap/Button';
import Footer from '../footer';
import Views from './addViews';

class PropertyDetails extends Component{
    state = {
      }
      getDetails = () =>{
        const { handle } = this.props.match.params
        fetch(`http://127.0.0.1:4000/api/AD/${handle}/`,{
            method : 'GET'
            }).then(resp=>resp.json()).then(res=>this.setState({res})).catch(error=>console.log(error));
      }
      componentDidMount () {
       this.getDetails();
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
            </div>
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
            <Button style={{backgroundColor:'#34495E'}}>Contact Seller</Button>
            </Col>
            <Col lg={12}>
            <h6><b>Location on Map</b> </h6><br/><br/>
            <MapDetail width="65vw" height="65vh" data={this.state.res} />
            </Col><br/><br/>
            <Col lg={12}>
            <Views data={this.state.res} />
            </Col>
            </div>
            </Row><br/><br/>
            </div>
            : null }<br/><br/>
            <Footer />
            </div>
        )
      }
    }



export default PropertyDetails;

