import React , {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import "./components.css";
import {withCookies} from 'react-cookie';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import {logout} from '../reducers/userSlice';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
class Navigation extends Component{
  state={
    token: this.props.cookies.get('adtoken'),
    user:[],
    profile:[],
    linkColor:this.props.linkColor,
  }
componentDidMount(){
  if (this.state.token){
    this.getUser()
  }
}
handleChange = (e) =>{
  const value = e.target.value;
  this.setState({
    [e.target.name]:value
  });
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
    this.props.cookies.remove('adtoken')
    const { dispatch } = this.props;
    dispatch(logout());
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
         borderRadius : '10px'
       }
     }
      return(
            <div>
                <Navbar className="nav mb-4 container-fluid" style={styles.color} expand="lg">
  <Navbar.Brand className="ml-3 mt-3" style={{fontSize:'2rem',color:`${this.state.linkColor}`,position:'relative',left:'50px',fontFamily:'Parisienne'}}><i className="fa fa-fw fa-home" style={{ fontSize: '1em',position:'relative',top:'2px' }} /><b><Link style={{color:this.state.linkColor}} to="/">
    Estate  </Link></b></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link ><Link style={{color:this.state.linkColor}} to="/map">
    Map  </Link>
    </Nav.Link>
    <Nav.Link ><Link style={{color:this.state.linkColor}} to="/store">
    Store  </Link>
    </Nav.Link>
    <Nav.Link ><Link style={{color:this.state.linkColor}} to="/price-index">
    Price Index  </Link>
    </Nav.Link>
    <Nav.Link ><Link style={{color:this.state.linkColor}} to="/search/None">
    Search Properties  </Link>
    </Nav.Link>
      <Button type="button" style={{color:'#ffeeea',backgroundColor:'#ff6645'}}   className="btn  mr-3">
      {this.state.token ?
      <Link to="/addProperty" style={{color:'#ffeeea'}}>Add New Property</Link>
       : 
       <Link to="/login" style={{color:'#ffeeea'}}>Add New Property</Link>}
      </Button>
    </Nav>
    {this.state.user ? 
      this.state.user.map(data=>
        <Nav.Link className="ml-4" style={{color:"white"}} ><Link style={{color:this.state.linkColor}} to="/dashboard">{data.username.toUpperCase()}</Link></Nav.Link>)
       : null}
      
    <Form inline>
    {this.state.token ?
      <button style={{backgroundColor:'#ff6645',color:'#ffeeea'}} onClick={this.logout} type='Button' className="btn btn-md  mr-2" >Logout</button>
       :
       <div>
      <button type='Button' style={{backgroundColor:'#ff6645',color:'#ffeeea'}} className="btn  btn-md ml-2 mr-2"><Link style={{color:this.state.linkColor}} to="/login">Login</Link></button>
      <button style={{backgroundColor:'#ff6645',color:'#ffeeea'}} type='Button' className="btn btn-md ml-2 mr-2"><Link style={{color:this.state.linkColor}} to="/signup">SignUp</Link></button>
      </div> }
    </Form>
  </Navbar.Collapse>
</Navbar>
            </div>
        );
    };
};
export default withCookies(connect()(Navigation));
