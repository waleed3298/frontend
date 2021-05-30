import React,{Component} from 'react';
import Navigation from '../navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../components.css';
import Data from '../mapdata';
import axios from 'axios';
import MapDetail from './detailmap';
import Button from 'react-bootstrap/Button';
import Footer from '../footer';
import Views from './addViews';
import {withCookies} from 'react-cookie';
import {Grid,Segment} from 'semantic-ui-react';
import { Card, Icon, Image,Divider } from 'semantic-ui-react'

class PropertyDetails extends Component{
    state = {
        flag:false,
        saved:false,
        error:'',
        token:this.props.cookies.get('adtoken'),
        map:true,
        additional:false,
        info:false,
        id:null,
        user:[],
        clicked:'',
      }
      getDetails = () =>{
        const { handle } = this.props.match.params
        fetch(`http://127.0.0.1:4000/api/AD/${handle}/`,{
            method : 'GET'
            }).then(resp=>resp.json()).then(res=>this.setState({res,clicked:res.Image})).catch(error=>console.log(error));
      }
      
      componentDidMount () {
       this.getDetails();
       this.setState({flag:true})
       if(this.state.res){
       }
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
       contact = () =>{
         window.location.href = `/inbox/${this.state.res.username}`
       }
       conditional = (e) =>{
        if(e==='map'){
          this.setState({map:true,additional:false,info:false})
        }
        else{
          if (e==='additional'){
            this.setState({map:false,additional:true,info:false})
          }
          else{
            this.setState({map:false,additional:false,info:true}) 
          }
        }
       }
       Clicked = (e) =>{
         this.setState({clicked:e})
       }
      compare = (id) =>{
        window.location.href = `/comparison/${id}`
      }
      render() {
          const properties = [this.state.Property]
        return(
            <div style={{backgroundColor:'white'}}>
            <Navigation linkColor="#556B2F" color="#f2f3f4" />
            <br />
            {this.state.res ? 
            <div style={{marginTop:'2%'}}>
            <Grid style={{marginLeft:'2%'}} columns={4} padded='vertically'>
          <Grid.Row style={{height:'50vh'}} relaxed columns={3}>
            <Grid.Column width={4}>
              <Image onClick={()=>this.Clicked(this.state.res.Image1)} style={{width:'16vw',height:'22vh',marginLeft:'20%',borderRadius:'10px',cursor:'pointer'}} src={this.state.res.Image1} /><br/>
              <Image onClick={()=>this.Clicked(this.state.res.Image2)} style={{width:'16vw',height:'22vh',marginLeft:'20%',borderRadius:'10px',cursor:'pointer'}} src={this.state.res.Image2} /><br/>
              <Image onClick={()=>this.Clicked(this.state.res.Image3)} style={{width:'16vw',height:'22vh',marginLeft:'20%',borderRadius:'10px',cursor:'pointer'}} src={this.state.res.Image3} /><br/></Grid.Column>
            <Grid.Column width={8} style={{width:'66vw',backgroundColor:'vanila'}}>
            <Image style={{width:'68vw',height:'72vh',marginRight:'40%',borderRadius:'10px'}} src={this.state.clicked} />
            </Grid.Column>
            <Grid.Column width={3}>
            <Card style={{marginLeft:'10%',marginTop:'10%',height:'60vh'}}>
      <Card.Content>
        <Image
          size='small'
          src='/person.jpg'
       circular style={{marginLeft:'10%',marginBottom:'10%'}} /><br/>
      {this.state.user.length>0 ? console.log(this.state.user) : null}
        <Card.Meta>{this.state.res.username.toUpperCase()}</Card.Meta>
        <Card.Description>
          Email: {this.state.res.email}<br/>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button onClick={this.contact} className="ml-4" basic style={{backgroundColor:'#2ECC71'}}>
            <i className="fa fa-envelope mr-4">  Contact Seller</i>
          </Button>
        </div>
      </Card.Content>
  </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/><br/>
        <div>
        <Grid style={{height:'50vh',marginTop:'15%',fontFamily:'Lora'}} columns={4} padded='horizontally'>
          <Grid.Row relaxed columns={3}>
            <Grid.Column width={4} >
            <h3 style={{color:'#2ECC71',marginLeft:'15%',fontWeight:'bold'}}>Rs. {this.state.res.Price}</h3><br/>
            <div style={{backgroundColor:'#e5e7e9',borderRadius:'50px',paddingTop:'10%',paddingBottom:'10%',textAlign:'center',width:'40%',marginLeft:'20%',marginTop:'10%'}}>
            <button onClick={(e)=>this.conditional("info")} style={{borderRadius:'50px',backgroundColor:`${this.state.info===true ?'white' : '#e5e7e9'}`,padding:'5px',border:'1px solid #e5e7e9'}}><Icon size="big" style={{color:'#808080'}} name="info"></Icon></button><br/><br/>
            <button onClick={(e)=>this.conditional("map")} style={{borderRadius:'50px',backgroundColor:`${this.state.map===true ?'white' : '#e5e7e9'}`,padding:'5px',border:'1px solid #e5e7e9'}}><Icon size="big" style={{color:'#808080'}} name="map marker" content='View Location on map'></Icon></button><br/><br/>
              <button onClick={(e)=>this.conditional("additional")} style={{borderRadius:'50px',backgroundColor:`${this.state.additional===true ?'white' : '#e5e7e9'}`,padding:'5px',border:'1px solid #e5e7e9'}}><Icon size="big" style={{color:'#808080'}} name="list" content='Additional Specifications of property'></Icon></button><br/><br/>
            
            </div>
              </Grid.Column>
            <Grid.Column width={8} style={{width:'66vw',backgroundColor:'vanila'}}>
            <Row>
              <Col lg={7} md={7} sm={7}>
              <h1 style={{fontWeight:'bold'}}>{this.state.res.Title}</h1>
            <h6 className="text-muted">{this.state.res.Location},{this.state.res.City}</h6>
              </Col>
              <Col lg={4} md={4} sm={4}>
              <button onClick={()=>this.compare(this.state.res.id)} className="btn btn-block" style={{backgroundColor:'green',color:'white'}} >Compare wih others</button>
              </Col>
              <Col lg={1} md={1} sm={1}>{this.state.saved!==false ? 
            <Icon size="big" style={{color:'tomato',float:'right',width:'20px',height:'20px',marginRight:'5%'}} name="heart"></Icon>
            : 
            <Icon size="big" onClick={this.handleClick} style={{color:'tomato',float:'right',marginRight:'5%'}} name="heart outline"></Icon>
          }<br/></Col>
            </Row><br/>
          <Row>
              <Col><h5 className="text-muted">Bedrooms</h5><h3><b>{this.state.res.Beds}</b>  <i className="fa fa-bed ml-2" style={{color:'#d7dbdd'}}></i></h3></Col>
              <Col><h5 className="text-muted">Bathrooms</h5><h3><b>{this.state.res.Baths}</b>  <i className="fa fa-bath ml-2" style={{color:'#d7dbdd'}}></i></h3></Col>
              <Col><h5 className="text-muted">Area</h5><h3><b>{this.state.res.Size} {this.state.res.Units}</b></h3></Col>
            </Row><br/>
            <Row>
              <Col><h5 className="text-muted">Type</h5><h3 style={{textTransform:'uppercase'}}><b>{this.state.res.Type}</b></h3></Col>
              <Col><h5 className="text-muted">Purpose</h5><h3 style={{textTransform:'uppercase'}}><b>{this.state.res.Purpose}</b>  </h3></Col>
              <Col><h5 className="text-muted">Status</h5><h3 style={{textTransform:'uppercase'}}><b>{this.state.res.Construction_status}</b></h3></Col>
            </Row><br/><br/>
            <Row>
              <Col lg={4} md={4} sm={4}><h3 ><b>Description:</b> </h3></Col>
              <Col lg={8} md={8} sm={8}><h5 className="text-muted">{this.state.res.Description}</h5></Col>
            </Row>
            </Grid.Column>
            <Grid.Column width={3}>
            {this.state.map===true ? 
            <MapDetail width="20vw" height="85vh" data={this.state.res} />
            :
            this.state.additional===true ? 
            <div>
              <h3>Additional Specifications</h3>
              {this.state.res.Additional_specification ? 
              <p>{this.state.res.Additional_specification}</p>
              :
              <p>No additional specifications available</p>
              }
            </div> 
            : null
            }
            </Grid.Column>
          </Grid.Row>
        </Grid></div>
          </div>
            : null }<br/><br/>
            </div>
        )
      }
    }



export default withCookies(PropertyDetails);

