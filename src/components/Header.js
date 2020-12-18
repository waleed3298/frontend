import React,{Component} from 'react';
import "./components.css";
import Button from 'react-bootstrap/Button';
import {withCookies} from 'react-cookie';
import {Link} from 'react-router-dom';
import {Row,Col} from 'react-bootstrap';

class Header extends Component{
  state = {
    search:'',
  }
signup = () =>{
  window.location.href='/signup'
}
  
handleChange = (event) =>{
  const value = event.target.value;
 this.setState({
   [event.target.name]: value 
 });
};
    render(){
      var URL = '/results/'
        return (
    <div className="header backgroundimage">
    <div className="top">
    <div className="dark-overlay landing-inner text-dark mt-4">
    <div className="tl container">
      <div  className="row mt-4">
        <div style={{width:'80%',left:'10%',right:'10%',top:'10%'}} className="mt-4 col-md-12 text-center mt-4">
        <div style={{position:'relative',top:'20%'}} className="row mt-4">
        <div className="col-lg-6 col-md-6">
          <h1 id="head" className="text-heavy text-left display-4 mb-4 mt-5 text-light" style={{fontWeight:"heavier",fontSize:'5rem'}}>Finding The Dream For Every Owner
</h1></div><div className="col-lg-6 col-md-6">
          <h4 style={{marginLeft:'22%',marginTop:'10%',width:'150px',color:'white'}}>Join Us Now</h4>
          <Button style={{marginRight:'70%',marginTop:'5%',width:'150px'}} className="button btn-md" onClick={this.signup} variant="info">Sign Up</Button><br/>
          <Button style={{marginRight:'70%',marginTop:'5%',width:'150px'}} className="button btn-md" onClick={this.signup} variant="info">Search Properties</Button><br/><br/><br/><br/>
          
          </div>
          </div>
          </div>
      </div>
    </div>
  </div>
  </div>
  </div>
            );
    };
}
export default withCookies(Header);
