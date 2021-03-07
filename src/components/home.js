import React, {Component} from 'react';
import './components.css';
import axios from 'axios';
import {Row,Col,Button,Image} from 'react-bootstrap';

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
    event.target.style.color='black';
  }
  handleClick=(id)=>{
    window.location.href=`/AdDetails/${id}`
  }
  signup=()=>{
    window.location.href=`/signup`
  }
    render(){
        return (<div>
        <div>
        <div style={{width:'100%',backgroundColor:'white',height:'100%'}}>
        <section style={{textAlign:'center',position:'relative',marginBottom:'10%'}}>
          <h1 style={{fontFamily:'Shippori Mincho'}}><b>We Lease, We List, We Sell</b></h1>
          <p style={{width:'60%',position:'relative',left:'20%'}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.</p>
          <br/>
          <Button style={{backgroundColor:'white',color:'grey'}}>More Information</Button>
        </section>  
        </div>
        <div style={{width:'100%',backgroundColor:'#eaeded',height:'60vh',paddingTop:'7%'}}>
          <section style={{width:'80%',position:'relative',left:'10%',right:'10%',marginBottom:'20%',textAlign:'center'}} id="features">
          <h3 style={{textAlign:'center',fontFamily:'Anton'}}><b>Why Choose Us?</b></h3><br/>
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
  </div>
  </div><div>
          <br /><br/>
  <section style={{position:'relative',width:'80%',left:'10%',marginTop:'16vh'}} id="latest">
  <Row>
    <Col style={{position:'relative',bottom:'10px'}}><Image style={{width:'300px',height:'300px',float:'right',marginRight:'50px'}} className="rounded-circle" src="/handshake.jpg" alt="handshake"/></Col>
    <Col style={{fontFamily:'Shippori Mincho'}}><h3 style={{width:'60%'}}><b>We help our clients make better decisions</b></h3>
    <p style={{width:'60%'}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.</p></Col>
  </Row><br/>
  <Row className="mt-4">
    <Col style={{fontFamily:'Shippori Mincho',textAlign:'right',position:'relative',left:'20%'}}><h3 style={{width:'60%'}}><b>Helping you find property of your dream</b></h3>
    <p style={{width:'60%'}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.</p></Col>
    <Col><Image style={{width:'300px',height:'300px',float:'left',marginLeft:'50px'}} className="rounded-circle" src="/houses.jpg" alt="houses"/></Col>
  </Row>
  </section><br/>
    <section id="img">
    <div style={{height:'80vh'}} id="div">
    <div style={{width:'80%',position:'relative',left:'5%',textAlign:'center',top:'18%'}}>
          <h1 style={{color:'white'}}>Say Goodbye to commissions</h1>
          <h6 style={{color:'white'}}>We have the best plan for you because your dreams are important to us</h6><br/>
          <Button onClick={this.signup} className="btn btn-lg mr-2" style={{display:'inline',backgroundColor:'tomato',color:'white'}}>I want to sell a home</Button><Button onClick={this.signup} className="btn btn-lg ml-2" style={{display:'inline',backgroundColor:'tomato',color:'white'}}>I want to buy a home</Button>
          </div></div> 
</section>
<section style={{width:'100%',backgroundColor:'#eaeded',paddingTop:'10%',paddingBottom:'10%'}} id="Most Viewed">
        <div style={{position:'relative',width:'80%',left:'10%'}}>
        <Row>
          <Col><Image style={{position:'relative',right:'2%',float:'right'}} src="/map1.png" /></Col>
          <Col><h3 style={{width:'60%'}}><b>Providing Service all over the country</b></h3>
    <p style={{width:'60%'}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true.</p></Col>
        </Row>
        </div>
    </section>
  
        </div></div>
        );
};
}
export default Home;

