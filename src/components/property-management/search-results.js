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

class SearchResult extends Component{
    state = {
        token: this.props.cookies.get('ad-token'),
        search:false,
        clicked:false,
        featured:[],
        postsPerPage : 3,
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
  let url = `http://127.0.0.1:4000/api/advertisements/?search=${handle}`
  axios.get(url,{
    headers:{
      'content-type':'multipart/form-data',
      'Authorization': `Token ${this.state.token}`
    }
  }).then(res=>this.setState({properties:res.data})).catch(error=>this.setState({error:error}));    
  this.setState({search:true})
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const url2 = `?search=${this.state.Type},${this.state.Location},${this.state.Construction_status},${this.state.Price},${this.state.Size},${this.state.Units},${this.state.City},${this.state.Purpose},`
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
        <div style={{backgroundColor:'white'}}>
        <Navigation color="#556B2F" />
        <div style={{textAlign:'center',width:'60%',position:'relative',left:'20%'}} className="text-center ui horizontal divider">
            Search Results
          </div>
        <div className="row"><div style={{textAlign:'center'}} className="col-lg-6 col-md-8 col-sm-12">
        <div  style={{width:'60%',zIndex:'1',position:'relative',bottom:'10%'}}>
        
        <Form style={{width:'65%',paddingRight:'5%'}}>
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
                            <Button onClick={this.handleSubmit} style={{backgroundColor:'#556B2F',position:'relative',left:'3%',width:'200px',bottom:'10%'}}>Apply Changes</Button>
  </div>
                    <br />
                  </Form.Group><br/>
                </Form><br/>
                </div></div><div className="col-lg-6 col-md-8 col-sm-12">
                <div style={{float:'right',position:'relative',top:'2%'}}>
                {this.state.properties.length!=0 & this.state.search ? 
    <div style={{width:'80%',position:'relative',left:'10%',right:'10%',marginBottom:'20%'}}>
    <Row>
    {currentPosts.map(property=>                      
      <div id={property.id} className="card mb-3" style={{minWidth: '150%',position:'relative',right:'50%'}}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src={property.Image} className="card-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{property.Title}</h5>
        <p className="card-text text-muted">Type: {property.Type}</p>
        <p className="card-text text-muted">For {property.Purpose}</p>
        <p style={{display:'inline',fontSize:'10px'}} className="card-text mr-2"><small className="text-muted"><i className="fa fa-2x fa-bed">   {property.Beds}</i></small></p>
       <p style={{display:'inline'}} className="card-text text-muted"><i className="fa  fa-bath">   {property.Baths}</i></p>
      </div>
      <Button onClick={()=>this.handleClick(property.id)} style={{backgroundColor:'#556b2f'}}>View Advertisement</Button>
    </div>
  </div>
</div>      
    )}
    </Row>
    <Pagination style={{position:'relative',right:'70%'}}
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.properties.length}
          paginate={paginate}
      /><br/><br/>
      </div>:
      <div>
      {this.state.clicked ?<div>
       <h1 style={{textAlign:'left'}}>Sorry! No results Found...</h1>
       <div style={{position:'relative',width:'80%'}} className="ui horizontal divider">
            Suggested Properties
          </div>
          <div style={{width:'80%',position:'relative',left:'10%',right:'10%',marginBottom:'5%'}}>
    <Row>
    {this.state.featured.map(property=>
      <div id={property.id} className="card mb-3" style={{maxWidth: '540px',position:'relative',right:'50%'}}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src={property.Image} className="card-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{property.Title}</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
    )}
    </Row>
    <br/><br/>
      </div>
  
      </div>
      : null }
    </div>}
       </div>
       </div></div>
        </div>

          );
  };
}

export default withCookies(SearchResult);
