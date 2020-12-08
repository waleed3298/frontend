import React , {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import "./components.css";

class Navigation extends Component{
    render(){
      const styles = {
        color:{
         backgroundColor : this.props.color
       }
     }
      return(
            <div>
                <Navbar className="nav container-fluid" style={styles.color} expand="lg">
  <Navbar.Brand className="ml-3 mt-3" style={{color:"#aad6f0"}} href="/">Vivid<b>Realty</b></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/map">Maps</Nav.Link>
      <Nav.Link style={{color:"white"}} href="#link">Plots</Nav.Link>
      <Nav.Link style={{color:"white"}} href="#link">About Us</Nav.Link>
    </Nav>
    <Form inline>
    <button type='Button' className="btn btn-md ml-2 mr-2" style={{backgroundColor:'#7BBc7f'}}>Sign Up</button>
    <button type='Button' className="btn btn-md ml-2 mr-2" style={{backgroundColor:'#7BBc7f'}}>Login</button>
    </Form>
  </Navbar.Collapse>
</Navbar>
            </div>
        );
    };
};
export default Navigation;
