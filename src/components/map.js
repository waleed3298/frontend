import React , {Component} from 'react';
import Data from './mapdata';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {withCookies} from 'react-cookie';
import Navigation from './navbar';
import './map.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Grid,Segment} from 'semantic-ui-react';
class Map extends Component{
  state = {
    token: this.props.cookies.get('adtoken'),
    search:false,
    clicked:false,
    featured:[],
    postsPerPage : 6,
    currentPage : 1,
    properties:[],
    City:'',
    Location:'',
    Size:'',
    Units:'',
    Construction_status:'',
    Price:'',
    Type:'',
    Purpose:'',
    Beds:'',
    Baths:'',
    long:[],
    lat:[],
};
handleChange = (event) =>{
  const value = event.target.value;
 this.setState({
   [event.target.name]: value 
 });
};
    componentDidMount() {
    axios.get(`http://127.0.0.1:4000/api/advertisements/`)
      .then(res => {
        const properties = res.data;
        this.setState({ properties });
      });
  }
  componentWillUpdate(){
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    const url2 = `?Type=${this.state.Type}&Location=${this.state.Location}&Construction_status=${this.state.Construction_status}&Price=${this.state.Price}&Size=${this.state.Size}&Units=${this.state.Units}&City=${this.state.City}&Purpose=${this.state.Purpose}&Beds=${this.state.Beds}&Baths=${this.state.Baths}`
    let url = 'http://127.0.0.1:4000/api/advertisements'+url2;
    axios.get(url,{
      headers:{
        'content-type':'multipart/form-data',
        'Authorization': `Token ${this.state.token}`
      }
    }).then(res=>this.setState({properties:res.data})).catch(error=>this.setState({error:error}));    
    this.setState({search:true})
    this.setState({clicked:true})
    const long = [];
    const lat = [];
    this.state.properties.map(property=>(long.push(property.longitude)))
    this.state.properties.map(property=>(lat.push(property.latitude)))
    this.setState({long:long})
    this.setState({lat:lat})
  }
  reset = () =>{
    this.setState({City:'',
    Location:'',
    Size:'',
    Units:'',
    Construction_status:'',
    Price:'',
    Type:'',
    Purpose:'',
    Beds:'',
    Baths:'',});
  }
  add = () =>{
    if (this.state.token){
      window.location.href="/addProperty"
    }
    else{
      window.location.href="/login"
    }
  }
  render(){
    return(
      <div style={{backgroundColor:'#fcfbff'}}>
  <Navbar style={{borderBottom:'1px solid #808080'}} className="nav container-fluid bg-light" expand="lg">
  <Navbar.Brand className="ml-3" style={{fontSize:'2rem',color:'#233443',position:'relative',left:'50px',fontFamily:'Parisienne'}} href="/"><i className="fa fa-fw fa-home" style={{ fontSize: '1em',position:'relative',top:'2px' }} /><b><a style={{color:'#233443'}} href="/">Estate</a></b></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link style={{color:"#233443"}} href="http://localhost:3000/search/None">Search Properties</Nav.Link>
      <Nav.Link style={{color:"#233443"}} href="http://localhost:3000/Price-index">Price-Index</Nav.Link>
      <Nav.Link style={{color:"#233443"}} href="http://localhost:3000/prediction">Evaluator</Nav.Link>
      <Nav.Link className="mr-2" style={{color:"#233443"}} href="http://localhost:3000/store">Store</Nav.Link>
    </Nav>
    <Button onClick={this.add} style={{backgroundColor:'#ff6645'}}><i className="fa fa-plus"></i> Post new property</Button>
  </Navbar.Collapse>
</Navbar>
      <Row><Col lg={6} md={6} style={{backgroundColor:'#fcfbff',height:'89.5vh'}}>
      <div  style={{width:'56%',zIndex:'1',height:'76vh',position:'relative',top:'5%'}}>
      <Form style={{width:'65%',}}>
                      <Form.Group>
                      <div id="SearchForm">
                      <Form.Label style={{color:'#233443'}}><b>Property Location:</b></Form.Label>
                        <Form.Control style={{backgroundColor:'#f4f6f7'}} onChange={e=>this.handleChange(e)} value={this.state.City} size="sm" name="City" type="text" placeholder="City" />
                      <br/> 
                        <Form.Control onChange={e=>this.handleChange(e)} style={{backgroundColor:'#f4f6f7'}} value={this.state.Location} size="sm" name="Location" type="text" placeholder="Location" />
                      <br/>
                      <Form.Label style={{color:'#233443'}}><b>Property Specifications:</b></Form.Label>
                      <Form.Control onChange={e=>this.handleChange(e)} style={{backgroundColor:'#f4f6f7'}} size="sm" name="Price" type="text" value={this.state.Price} placeholder="Estimated Price of the property" />    
                      <br/>
                          <Form.Control size="sm" style={{backgroundColor:'#f4f6f7'}} onChange={e=>this.handleChange(e)} value={this.state.Size} name="Size" type="text" placeholder="Size Property" />
                          <br/>
                          <Row>
                          <Col>
                            <Form.Control style={{backgroundColor:'#f4f6f7'}} value={this.state.Units} name='Units' onChange={this.handleChange} size="sm" as="select">
                                      <option value="square_yards">Units</option>
                                      <option value="square_yards">Square Yards</option>
                                      <option value="square_metres">Square Metres</option>
                                      <option value="marla">Marla</option>
                                      <option value="kanal">Kanal</option>
                                      </Form.Control>
                                      <br />
                          </Col>
                          <Col>
                          <Form.Control style={{backgroundColor:'#f4f6f7'}} name="Construction_status" value={this.state.Construction_status} onChange={this.handleChange} size='sm' as='select'>
                                      <option value="">Status</option>
                                      <option value="complete">Complete</option>
                                      <option value="under_construction">Under Construction</option>
                          </Form.Control>                         
                          </Col>
                          </Row>
                          <Row>
                            <Col>
                            <Form.Control size="sm" style={{backgroundColor:'#f4f6f7'}} onChange={e=>this.handleChange(e)} value={this.state.Beds} name="Beds" type="text" placeholder="Bedrooms" />
                            </Col>
                            <Col>
                            <Form.Control size="sm" style={{backgroundColor:'#f4f6f7'}} onChange={e=>this.handleChange(e)} value={this.state.Baths} name="Baths" type="text" placeholder="Bathrooms" />
                            </Col>
                          </Row><br/>
                          <Form.Label style={{color:'#233443'}}><b>Property Type:</b></Form.Label>
                          
                          <Form.Control style={{backgroundColor:'#f4f6f7'}} name="Purpose" value={this.state.Type} onChange={this.handleChange} size='sm' as='select'>
                                      <option value="">Purpose</option>
                                      <option value="sale">Sale</option>
                                      <option value="rent">Rent</option>
                                      </Form.Control> <br/>            
                          <Form.Control style={{backgroundColor:'#f4f6f7'}} name="Type" value={this.state.Type} onChange={this.handleChange} size='sm' as='select'>
                                      <option value="">Type</option>
                                      <option value="property">House</option>
                                      <option value="plot">Plot</option>
                                      <option value="commercial_area">Commercial Area</option>
                          </Form.Control>                         
                          
                          <br />
                          <Row>
                            <Col lg={6} md={6}>
                            <Button onClick={this.handleSubmit} style={{backgroundColor:'#ff6645',position:'relative',width:'120px'}}>Apply Changes</Button>
                            </Col>
                            <Col lg={6} md={6}>
                          <Button className="mr-2" onClick={this.reset} style={{backgroundColor:'#ff6645',position:'relative',width:'100px'}}>Reset Form</Button>
                            </Col>
                          </Row>
</div>
                  <br />
                </Form.Group><br/>
              </Form><br/>
              </div></Col><Col lg={6} md={6}>
                <div className="mr-1" style={{float:'right',position:'relative'}}> <Data width="80vw" height="89.5vh" data={this.state}   /></div> 
     </Col></Row>
      </div>
    )
  }
}
export default  withCookies(Map);
