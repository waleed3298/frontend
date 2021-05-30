import React,{Component} from 'react';
import '../components.css';
import Button from 'react-bootstrap/Button';
import {withCookies} from 'react-cookie';
import {Row,Col,Form} from 'react-bootstrap';
import axios from 'axios';
import Pagination from '../pagination';
import Navigation from '../navbar';
import {Link} from 'react-router-dom';
import Footer from '../footer';
import {Grid,Segment} from 'semantic-ui-react'
class SearchResult extends Component{
    state = {
        token: this.props.cookies.get('adtoken'),
        search:false,
        clicked:false,
        featured:[],
        postsPerPage : 8,
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
    }
handleChange = (event) =>{
    const value = event.target.value;
   this.setState({
     [event.target.name]: value 
   });
  };
handleClick = (id) =>{
  window.location.href = `/AdDetails/${id}`
}
getResults = () =>{
  const { handle } = this.props.match.params
  if (handle){
  let url = `http://127.0.0.1:4000/api/advertisements?${handle}`
  axios.get(url,{
    headers:{
      'content-type':'multipart/form-data',
      'Authorization': `Token ${this.state.token}`
    }
  }).then(res=>this.setState({properties:res.data})).catch(error=>this.setState({error:error}));    
  this.setState({search:true})
  }}

  handleSubmit = (e) =>{
    e.preventDefault();
    const url2 = `?Type=${this.state.Type}&Location=${this.state.Location}&Construction_status=${this.state.Construction_status}&Price=${this.state.Price}&Size=${this.state.Size}&Units=${this.state.Units}&City=${this.state.City}&Purpose=${this.state.Purpose}&Beds=${this.state.Beds}&Baths=${this.state.Baths}`
    console.log(this.state);
    let url = 'http://127.0.0.1:4000/api/advertisements'+url2;
    axios.get(url,{
      headers:{
        'content-type':'multipart/form-data',
        'Authorization': `Token ${this.state.token}`
      }
    }).then(res=>this.setState({properties:res.data})).catch(error=>this.setState({error:error}));    
    this.setState({search:true})
    this.setState({clicked:true})
  }
  componentDidMount(){
    this.getResults();
    this.getFeatured();
  }
  getFeatured = () =>{
    let url = 'http://127.0.0.1:4000/api/Featured/'
    axios.get(url,{
      headers:{
        'content-type':'multipart/form-data',
      }
    }).then(res=>this.setState({featured:res.data})).catch(error=>this.setState({error:error}));
  }

render(){
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.properties.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => this.setState({currentPage:pageNumber});
      return (
        <div style={{backgroundColor:'#fcfbff'}}>
        <Navigation color="#f5f8fa" linkColor="#23313e" />
        <div style={{textAlign:'center',width:'60%',position:'relative',left:'20%'}} className="text-center ui horizontal divider">
            Search Results
          </div>
        <Grid columns={2} stackable>
        <Grid.Row>
        <Grid.Column  width={7}>
        <div  style={{width:'70%',zIndex:'1'}}>
        
        <Form style={{width:'65%',paddingRight:'5%',marginLeft:'5%',position:'relative',top:'5%'}}>
                        <Form.Group>
                        <div id="SearchForm">
                        <Form.Label><b>Property Location:</b></Form.Label>
                          <Form.Control style={{backgroundColor:'#f4f6f7'}} onChange={e=>this.handleChange(e)} value={this.state.City} size="sm" name="City" type="text" placeholder="City" />
                        <br/> 
                          <Form.Control onChange={e=>this.handleChange(e)} style={{backgroundColor:'#f4f6f7'}} value={this.state.Location} size="sm" name="Location" type="text" placeholder="Location" />
                        <br/>
                        <Form.Label><b>Property Specifications:</b></Form.Label>
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
                            <Form.Label><b>Property Type:</b></Form.Label>
                            
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
                            <Button onClick={this.handleSubmit} style={{backgroundColor:'#ff6645',position:'relative',left:'1%',width:'190px',bottom:'10%'}}>Apply Changes</Button>
  </div>
                    <br />
                  </Form.Group><br/>
                </Form><br/>
                </div></Grid.Column><Grid.Column width={9}>
                <div style={{float:'right',position:'relative',top:'2%',left:'10%'}}>
                {this.state.properties.length!=0 & this.state.search ? 
    <div style={{width:'100%',position:'relative',right:'30%',marginBottom:'20%'}}>
    <Row>
                {currentPosts.map(property=>{
                    return(
                    <Col sm={12} md={6} lg={6}>
                    <div  onClick={()=>this.handleClick(property.id)} id={property.id} className="card mb-3" style={{width:'28vw',maxWidth: '540px',position:'relative',right:'40%',marginLeft:'50px',cursor:'pointer'}}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img style={{height:'120px'}} src={property.Image} className="card-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 style={{fontWeight:'bold'}} className="card-title">{property.Title}</h5>
        <p style={{fontWeight:'heavy'}}>Rs. {property.Price}</p>
        <p className="card-text"><small className="text-muted">{property.Size} {property.Units}</small></p>
      </div>
    </div>
  </div>
</div>
                    </Col>
                    )
                })}
                </Row>
    <Pagination style={{position:'relative',right:'70%'}}
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.properties.length}
          paginate={paginate}
      /><br/><br/>
      </div>:
      <div>
      {this.state.clicked ?<div style={{width:'100%',position:'relative',right:'30%',marginBottom:'20%'}}>
      <div>
       <h1 style={{textAlign:'left'}}>Sorry! No results Found...</h1>
       <div style={{position:'relative',width:'80%'}} className="ui horizontal divider">
            Suggested Properties
          </div>
    <Row>
    {this.state.featured.map(property=>
      <Col lg={6} md={6}>
      <div  onClick={()=>this.handleClick(property.id)} id={property.id} className="card mb-3" style={{width:'26vw',maxWidth: '540px',position:'relative',right:'40%',marginLeft:'50px',cursor:'pointer'}}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src={property.Image} className="card-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 style={{fontWeight:'bold'}} className="card-title">{property.Title}</h5>
        <h5 style={{fontWeight:'heavy'}} className="card-title">Rs. {property.Price}</h5>
        <p className="card-text">{property.description}</p>
        <p className="card-text"><small className="text-muted">{property.Size} {property.Units}</small></p>
      </div>
    </div>
  </div>
</div>
</Col>
    )}
    </Row>
    <br/><br/>
      </div>
  
      </div>
      : null }
    </div>}
       </div>
       </Grid.Column></Grid.Row></Grid>
        </div>

          );
  };
}

export default withCookies(SearchResult);
