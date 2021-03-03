import React , {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import "./components.css";
import {withCookies} from 'react-cookie';
import Button from 'react-bootstrap/Button';
class Navigation extends Component{
  state={
    token: this.props.cookies.get('ad-token'),
    user:[],
    profile:[]
  }
componentDidMount(){
  if (this.state.token){
    this.getUser()
    this.getProfiles();
  }
}
handleChange = (e) =>{
  const value = e.target.value;
  this.setState({
    [e.target.name]:value
  });
}
getProfiles = () =>{
  fetch("http://127.0.0.1:4000/api/profile/",{
        method : 'GET',
        headers:{
          'Authorization':`Token ${this.state.token}`
        }
        }).then(resp=>resp.json()).then(res=>this.setState({profile:res})).catch(error=>console.log(error));
        console.log((this.state.profile))
        this.setState({flag:true});
}
  getUser = () =>{
    fetch("http://127.0.0.1:4000/api/user/",{
            method : 'GET',
            headers:{
              'Authorization':`Token ${this.state.token}`
            }
            }).then(resp=>resp.json()).then(res=>this.setState({user:res})).catch(error=>console.log(error));
  }

  logout = () =>{
    this.props.cookies.remove('ad-token')
    window.location.href = "/"
  }
  add = () =>{
    if (this.state.token){
      window.location.href="/addProperty"
    }
    else{
      window.location.href="/login"
    }
  }
 
  login = () =>{
    window.location.href = '/login'
  }
  signup = () =>{
    window.location.href = '/signup'
  }
    render(){
      const styles = {
        color:{
         backgroundColor : this.props.color,
       }
     }
      return(
            <div>
                <Navbar className="nav mb-4 container-fluid" style={styles.color} expand="lg">
  <Navbar.Brand className="ml-3 mt-3" style={{fontSize:'2rem',color:'white',position:'relative',left:'50px',fontFamily:'Parisienne'}} href="/"><i className="fa fa-fw fa-home" style={{ fontSize: '1em',position:'relative',top:'2px' }} /><b>Estate</b></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/map">Map</Nav.Link>
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/properties">Buy</Nav.Link>
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/plots">Rent</Nav.Link>
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/commercial-areas">Blog</Nav.Link>
      <Nav.Link style={{color:"white"}} href="http://localhost:3000/search">Search Properties</Nav.Link>
      <Button onClick={this.add}  type="button"  className="btn btn-secondary mr-3">Add New Property</Button>
    </Nav>
    {this.state.user ? 
      this.state.user.map(data=>
        <Nav.Link className="ml-4" style={{color:"white"}} href="http://localhost:3000/dashboard">{data.username.toUpperCase()}</Nav.Link>)
       : null}
      
    <Form inline>
    {this.state.token ?
      <div>
      {this.state.profile.length>0?
        this.state.profile.map(profile=>{
        <h6>{profile.Age}</h6>
      }) : null}
      <button onClick={this.logout} style={{backgroundColor:'orange',color:'white'}} type='Button' className="btn btn-md  mr-2" >Logout</button></div>
       :
       <div>
      <button onClick={this.login} type='Button' style={{backgroundColor:'#EB984E',color:'white'}} className="btn  btn-md ml-2 mr-2">Login</button>
      <button onClick={this.signup} style={{backgroundColor:'#EB984E',color:'white'}} type='Button' className="btn btn-md ml-2 mr-2">SignUp</button>
      </div> }
    </Form>
  </Navbar.Collapse>
</Navbar>
            </div>
        );
    };
};
export default withCookies(Navigation);
