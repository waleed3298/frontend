import React, {Component} from 'react';
import './components.css';
import axios from 'axios';
import {Row,Col,Button} from 'react-bootstrap';

class Home extends Component{
  state = {
    properties:[],
    viewed:[],
  }
  getLatest = () =>{
    let url = 'http://127.0.0.1:4000/api/Latest/'
    axios.get(url,{
      headers:{
        'content-type':'multipart/form-data',
      }
    }).then(res=>this.setState({properties:res.data})).catch(error=>this.setState({error:error}));
  }
  getViewed = () =>{
    let url = 'http://127.0.0.1:4000/api/MostViewed/'
    axios.get(url,{
      headers:{
        'content-type':'multipart/form-data',
      }
    }).then(res=>this.setState({viewed:res.data})).catch(error=>this.setState({error:error}));
  
  }
  componentDidMount(){
    this.getLatest();
    this.getViewed();
    }
   MouseOver = (event) =>{
    event.target.style.color = '#457b9d';    
  }
   MouseOut = (event) =>{
    event.target.style.color="#34495E";
  }
  handleClick=(id)=>{
    window.location.href=`/AdDetails/${id}`
  }
    render(){
        return (<div>
        <div style={{width:'80%',position:'relative',left:'10%',right:'10%',marginBottom:'5%',textAlign:'center'}}>
        <h1 style={{textAlign:'center',fontFamily:'Anton'}}><b>Why Estate?</b></h1><br/>
          <section id="features">
<div className="row">
  <div className="feature-box col-lg-4">
  <i onMouseOver={this.MouseOver} onMouseOut={this.MouseOut} style={{fontSize:'50px'}} className="icon fas fa-check-circle fa-4x mb-4"></i>
    <h3 style={{fontWeight:'600'}}>Easy to use.</h3>
    <p>Buy and Sell your houses easily.</p>
</div>
<div className="feature-box col-lg-4">
  <i onMouseOver={this.MouseOver} onMouseOut={this.MouseOut} style={{fontSize:'50px'}} className="icon fas fa-building fa-4x mb-4"></i>
    <h3 style={{fontWeight:'600'}}>Elite Clientele</h3>
    <p>We have all type of properties to deal with.</p>
</div>
<div className="feature-box col-lg-4">
    <i onMouseOver={this.MouseOver} onMouseOut={this.MouseOut} style={{fontSize:'50px'}} className="icon fas fa-wrench fa-4x mb-4"></i>
    <a href="/store"><h3 style={{fontWeight:'bold',color:'black'}}>Construction Material</h3></a>
    <p>Buy and Sell All type of Construction Material.</p>
</div>
</div>
  </section>
  </div><div>
          <br /><br/>
  <section id="latest">
  <div style={{width:'80%',position:'relative',left:'10%',right:'10%',marginBottom:'5%'}}>
    <div className="ui horizontal divider">
            Latest Advertisements
          </div><br/><br/>
    <Row>
    {this.state.properties.map(property=>
      <Col key={property.id} sm={12} md={6} lg={4}>
                    <div style={{marginBottom:'10px'}} className="ui link cards">
                      <div  className="card">
                        <div className="image">
                      <div style={{backgroundColor:'#eaeded',width:'20%',position:'relative',marginLeft:'15px'}} class="ui blue ribbon label">
                          <i style={{color:'white'}} class="star icon"></i> Latest
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
  </section>
  <section id="Most Viewed">
  <div style={{width:'80%',position:'relative',left:'10%',right:'10%'}}>
    <div className="ui horizontal divider">
            Most Viewed Advertisements
          </div><br/><br/>
    <Row>
    {this.state.properties.map(property=>
      <Col key={property.id} sm={12} md={6} lg={4}>
                    <div style={{marginBottom:'10px'}} className="ui link cards">
                      <div  className="card">
                        <div className="image">
                      <div style={{backgroundColor:'#eaeded',width:'20%',position:'relative',marginLeft:'15px'}} class="ui red ribbon label">
                          <i style={{color:'white'}} class="eye icon"></i> Most Viewed
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
                      <Button className="btn-md " onClick={()=>this.handleClick(property.id)} style={{backgroundColor:'#34495E'}}>View Advertisement</Button>
                        </span>
                        </div>
                      </div>
                    </div>
                    </Col>
    )}
    </Row>
    <br/><br/>
      </div>
  </section>
  
        </div></div>
        );
};
}
export default Home;

