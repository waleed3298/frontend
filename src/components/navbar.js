import React , {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import "./components.css";
import {withCookies} from 'react-cookie';
import Image from 'react-bootstrap/Image';
import NavImage from './house-with-garage.png';

class Navigation extends Component{
  logout = () =>{
    this.props.cookies.remove('ad-token')
    window.location.href = "/"
  }
  state={
    token: this.props.cookies.get('ad-token')
  }
  signup = () =>{
    window.location.href = '/signup'
  }
  login = () =>{
    window.location.href = '/login'
  }
    render(){
      const styles = {
        color:{
         backgroundColor : this.props.color
       }
     }
      return(
            <div>
                <Navbar className="nav mb-4 container-fluid" style={styles.color} expand="lg">
  <Navbar.Brand className="ml-3 mt-3" style={{color:'white'}} href="/"><b>Estate</b></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/map">Maps</Nav.Link>
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/properties">Properties</Nav.Link>
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/plots">Plots</Nav.Link>
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/commercial-areas">Commercial Areas</Nav.Link>
    </Nav>
    <Form inline>
    {this.state.token ?
      <button onClick={this.logout} type='Button' className="btn btn-md ml-2 mr-2" style={{backgroundColor:'#7BBc7f'}}>Logout</button>
       :
       <div>
      <button onClick={this.signup} type='Button' className="btn btn-md ml-2 mr-2" style={{backgroundColor:'#7BBc7f'}}>Sign Up</button>
      <button onClick={this.login} type='Button' className="btn btn-md ml-2 mr-2" style={{backgroundColor:'#7BBc7f'}}>Login</button>
      </div> }
    </Form>
  </Navbar.Collapse>
</Navbar>
            </div>
        );
    };
};
export default withCookies(Navigation);
