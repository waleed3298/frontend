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
    <div >    
    <Row>
      <Col className="grad" lg={5}>
      <div style={{position:'relative',left:'8%'}} >
          <h1  className="text-heavy text-left display-4 mt-4 mb-4 text-dark" style={{fontWeight:"bold",fontFamily:'Lora',fontSize:'5rem',position:'relative',top:'8vh',left:'16%',width:'80%'}}>Finding The Dream For Every Owner
</h1><br/><br/>
<LandingForm />
</div>
      </Col>
      <Col lg={7}>
      <img src="/sample5.png" alt="landing" style={{width:'100%',height:'100%'}}></img>
      </Col>
    </Row><br/>
    </div>
            );
    };
}
export default withCookies(Header);