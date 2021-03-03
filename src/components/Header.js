import React,{Component} from 'react';
import "./components.css";
import Button from 'react-bootstrap/Button';
import {withCookies} from 'react-cookie';
import {Link} from 'react-router-dom';
import {Row,Col} from 'react-bootstrap';
import LandingForm from './landingform';

class Header extends Component{
  state = {
    search:'',
  }
signup = () =>{
  window.location.href='/signup'
}
search = () =>{
  window.location.href='/search'
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
    <div className="dark-overlay landing-inner text-dark mt-2">
    <div className="tl container">
      <div  className="row">
        <div style={{width:'80%',left:'10%',right:'10%',top:'2%'}} className="mt-4 col-md-12 text-center mt-4">
        <div style={{position:'relative',top:'10%'}} className="row mt-4">
        <div className="col-lg-6 col-md-6">
          <h1 id="head" className="text-heavy text-left display-4 mb-4 mt-5 text-light" style={{fontWeight:"heavier",fontSize:'5rem',position:'relative',right:'5%'}}>Finding The Dream For Every Owner
</h1></div><div className="col-lg-6 col-md-6">
       <LandingForm />    
          </div>
          </div>
          </div>
      </div>
    </div>
  </div><br/><br/><br/><br/>
  </div>
  <br/>        
  </div>
            );
    };
}
export default withCookies(Header);