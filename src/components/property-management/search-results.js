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
        <Navigation color="black" />
        <Row><Col lg={6} md={6}>
        <div  style={{width:'60%',zIndex:'1'}}>
        <Form style={{width:'65%',backgroundColor:'transparent'}}>
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
                            <Row>
                              <Col>
                              <Form.Group style={{width:'40%'}} value={this.state.Purpose} onChange={this.handleChange}>
                            <Row>
                            <Col><Form.Check onClick={this.HouseForm} name="Purpose" value="sale" type="radio" label="Sale"></Form.Check></Col>
                            <Col><Form.Check onClick={this.PlotForm} name="Purpose" value="rent" type="radio" label="Rent"></Form.Check></Col>
                            </Row>
                            </Form.Group>
                              <Col>
                            </Col>  
                              </Col>
                            <Col>
                            <Form.Group style={{width:'60%',position:'relative',left:'20%',right:'20%'}} value={this.state.Type} onChange={this.handleChange}>
                            <Row>
                            <Col><Form.Check onClick={this.HouseForm} name="Type" value="property" type="radio" label="House"></Form.Check></Col>
                            <Col><Form.Check onClick={this.PlotForm} name="Type" value="plot" type="radio" label="Plot"></Form.Check></Col>
                            <Col><Form.Check onClick={this.PlotForm} name="Type" value="commercial" type="radio" label="Commercial"></Form.Check>
                            </Col>
                            </Row>
                            </Form.Group>
                            </Col>
                            </Row>
                            <br />
                            <Button onClick={this.handleSubmit} style={{backgroundColor:'#34495E',position:'relative',left:'3%',width:'200px',bottom:'10%'}}>Apply Changes</Button>
  </div>
                    <br />
                  </Form.Group><br/>
                </Form><br/>
                </div></Col><Col lg={6} md={6}>
                <div style={{float:'right',position:'relative',top:'2%'}}>
                {this.state.properties.length!=0 & this.state.search ? 
    <div style={{width:'80%',position:'relative',left:'10%',right:'10%',marginBottom:'20%'}}>
    <div className="ui horizontal divider">
            Seach Results
          </div>
    <Row>
    {currentPosts.map(property=>
      <Col key={property.id} sm={12} md={12} lg={12}>
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
                            {property.Date}
                          </span>
                          <span>
                            {property.Size} {property.Units}
                          </span><br/>
                          <span className="mt-2">
                      <Button className="btn-md " onClick={()=>this.handleClick(property.id)} style={{backgroundColor:'#34495E',marginLeft:'30px'}}>View Advertisement</Button>
                        </span>
                        </div>
                      </div>
                    </div>
                    </Col>
    )}
    </Row>
    <Pagination style={{position:'relative',left:'30%',right:'30%'}}
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.properties.length}
          paginate={paginate}
      /><br/><br/>
      <Footer style={{width:'100%'}} />
      </div>:
      <div>
      {this.state.clicked ?<div>
       <h1 style={{textAlign:'center'}}>Sorry! No results Found...</h1>
       <div style={{position:'relative',left:'10%',width:'80%'}} className="ui horizontal divider">
            Suggested Properties
          </div>
          <div style={{width:'80%',position:'relative',left:'10%',right:'10%',marginBottom:'5%'}}>
    <Row>
    {this.state.featured.map(property=>
      <Col key={property.id} sm={12} md={12} lg={12}>
                    <div style={{marginBottom:'10px'}} className="ui link cards">
                      <div  className="card">
                        <div className="image">
                      <div style={{backgroundColor:'#eaeded',width:'20%',position:'relative',marginLeft:'15px'}} class="ui yellow ribbon label">
                          <i style={{color:'white'}} class="star icon"></i> Featured
                        </div>                              
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
                            {property.Date}
                          </span>
                          <span>
                            {property.Size} {property.Units}
                          </span><br/><br/>
                          <span className="mt-2">
                      <Button className="btn-md " onClick={()=>this.handleClick(property.id)} style={{backgroundColor:'#34495E',marginLeft:'30px'}}>View Advertisement</Button>
                        </span>
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
       </Col></Row>
        </div>

          );
  };
}

export default withCookies(SearchResult);
