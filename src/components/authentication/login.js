import React,{Component} from 'react';
import Navigation from '../navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {withCookies} from 'react-cookie';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login, selectAuthError, selectIsLoggedIn, selectIsLoading} from '../../reducers/userSlice';
import {Link} from 'react-router-dom';
class Login extends Component{
    state = {
        credentials:{
            username:'',password:''
        },
        errorMessage : '',
    }
    handleChange = (event) =>{
        const cred = this.state.credentials
        cred[event.target.name] = event.target.value
        this.setState({credentials:cred})
    }
    getToken = () =>{
        fetch('http://127.0.0.1:4000/token/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        console.log(data.token)
        if (data.token != null){
        this.props.cookies.set('adtoken',data.token)
        const tok = localStorage.getItem('token')
        if(tok){
          window.location.href="/dashboard"
        }
        else{
          console.log("No token")
        }
        }
        else{
            this.setState({errorMessage:'Username or Password Incorrect'})
        }
      }
    )
    .catch( error => console.error(error))
    
    }
    hasLogin = e =>{
      const { dispatch } = this.props;
        e.preventDefault();
        dispatch(login(this.state.credentials.username, this.state.credentials.password));
        this.getToken()
      }
    
    render(){
        return (
            <div>
            <Link to='/'>
  <h1 className="mt-4 mr-4" style={{color:'#556B2F',float:'right',fontFamily:'Parisienne',cursor:'pointer'}} onClick={this.home} ><i className="fa fa-fw fa-home" style={{ fontSize: '1em',position:'relative',top:'2px'}}/>Estate</h1></Link>
            <Row>
                <Col lg={3} md={3} sm={3} className="login"><div id="div1" ><div style={{position:'relative'}}><h4 style={{color:'white',textAlign:'center'}}>Try It Today</h4><br/>
                <p style={{color:'white',textAlign:'center'}}>No Advance payment required</p><br/>
                <Link to='/signup'>
                <button  style={{backgroundColor:'#556B2F',position:'relative',left:'35%',color:'white'}} className="btn btn-lg ml-3">Sign Up</button></Link></div></div>
                </Col>
              <Col className="mt-4" style={{position:'relative',right:'10%'}} lg={9} md={9} sm={9}>                <br/>
            <div className="Form">
            <h1 className="" style={{textAlign:'center',position:'relative',top:'70px',color:'#9ACD32',fontFamily:'Oswald'}}>Welcome Back!</h1><br/>
            <h3 style={{textAlign:'left',position:'relative',top:'65px',color:'#9ACD32',left:'20%'}}>Sign In</h3>
             <div id="Form">
             {this.state.errorMessage ? 
            <h5 style={{textAlign:'center',color:'tomato'}}>{this.state.errorMessage}</h5>
             : null}
            <Form.Group style={{position:'relative',bottom:'10%'}}>
            <Form.Label>Username:</Form.Label>
                <Form.Control onChange={this.handleChange} name="username" value={this.state.credentials.username} size="md" type="text" placeholder="Username" /><br />
            <Form.Label>Password:</Form.Label>
                <Form.Control onChange={this.handleChange} size="md" name="password" value={this.state.credentials.password} type="password" placeholder="Enter your Password" /><br />
                <button className="btn" onClick={this.hasLogin} style={{textAlign:'center',position:'relative',width:'100px',left:'40%',backgroundColor:'#556B2F',color:'white'}} variant="info">Log In</button><br/>
                
            </Form.Group>
            </div>
            </div>
            </Col>
            </Row>            
</div>
        )
    }
}

export default withCookies(connect()(Login));