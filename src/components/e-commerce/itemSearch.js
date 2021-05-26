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
import {Range} from 'react-range'
class ItemSearch extends Component{
    state = {
        token: this.props.cookies.get('adtoken'),
        search:false,
        clicked:false,
        values : [50],
        featured:[],
        postsPerPage : 8,
        currentPage : 1,
        properties:[],
        price:'',
        name:'',
        brand:'',
        category:'',
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
    const url2 = `?name=${this.state.name}&brand=${this.state.brand}&price=${this.state.price}&category=${this.state.category}`
    console.log(this.state);
    let url = 'http://127.0.0.1:4000/api/productSearch'+url2;
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
        <div style={{position:'relative',top:'10vh'}}>        
        <div style={{textAlign:'center',width:'60%',position:'relative',left:'20%'}} className="text-center ui horizontal divider">
           <h1 style={{fontFamily:'Lora',fontWeight:'bold'}}> Search Results</h1>
          </div>
        <Grid columns={2} stackable>
        <Grid.Row>
        <Grid.Column  width={7}>
        <div  style={{width:'70%',zIndex:'1'}}>
        
        <Form style={{width:'65%',paddingRight:'5%',marginLeft:'5%',position:'relative',top:'5%'}}>
                        <Form.Group>
                        <div id="SearchForm">
                        <Form.Label><b>Item Name: </b></Form.Label>
                          <Form.Control style={{backgroundColor:'#f4f6f7'}} onChange={e=>this.handleChange(e)} value={this.state.name} size="sm" name="name" type="text" placeholder="Name" />
                        <br/> 
                          <Form.Control onChange={e=>this.handleChange(e)} style={{backgroundColor:'#f4f6f7'}} value={this.state.brand} size="sm" name="brand" type="text" placeholder="Brand/Company" /><br/>
                              <Form.Control style={{backgroundColor:'#f4f6f7'}} value={this.state.category} name='category' onChange={this.handleChange} size="sm" as="select">
                                        <option value="">Category</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Paints">Paints</option>
                                        <option value="Construction Tools">Construction Tools</option>
                                        <option value="Building Material">Building Material</option>
                                        <option value="Lighting">Lighting</option>
                                        <option value="Bathroom">Bathroom</option>
                                        <option value="Hardware">Hardware</option>
                                        <option value="Decor">Decor</option>
                                        <option value="Walls and flooring">Walls and Flooring</option>
                                        <option value="Kitchen">Kitchen</option>
                                        <option value="Security">Security</option>
                                        </Form.Control>
                                        <br />
                              <Form.Control size="sm" style={{backgroundColor:'#f4f6f7'}} onChange={e=>this.handleChange(e)} value={this.state.price} name="price" type="text" placeholder="Price in Rs." />
                          <br />  <Button onClick={this.handleSubmit} style={{backgroundColor:'#ff6645',position:'relative',left:'1%',width:'210px',bottom:'10%'}}>Apply Changes</Button>
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
      <img style={{height:'120px'}} src={property.image} className="card-img" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 style={{fontWeight:'bold'}} className="card-title">{property.name}</h5>
        <p style={{fontWeight:'heavy'}}>Rs. {property.price}</p>
        <p className="card-text"><small className="text-muted">{property.category}</small></p>
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
</div>

          );
  };
}

export default withCookies(ItemSearch);
