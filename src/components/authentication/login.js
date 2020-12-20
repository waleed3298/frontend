import React,{Component} from 'react';
import Navigation from '../navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {withCookies} from 'react-cookie';

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
        fetch('http://127.0.0.1:4000/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        console.log(data.token)
        if (data.token != null){
        this.props.cookies.set('ad-token',data.token)    
         window.location.href = '/dashboard'
        }
        else{
            this.setState({errorMessage:'Username or Password Incorrect'})
        }
      }
    )
    .catch( error => console.error(error))
    
    }
    login = () =>{
        this.getToken()
    }
    
  signup = () =>{
    window.location.href = '/signup'
  }

    render(){
        return (
            <div>
            <Navigation color="#34495E" />
            <div className="Form">
            <h1 className="text-info mt-4" style={{textAlign:'center'}}>Login</h1>
            <br/>
            {this.state.errorMessage ? 
            <h6>{this.state.errorMessage}</h6>
             : null}
             <div id="Form">
            <Form.Group>
            <Form.Label>Username:</Form.Label>
                <Form.Control onChange={this.handleChange} name="username" value={this.state.credentials.username} size="md" type="text" placeholder="Username" /><br />
            <Form.Label>Password:</Form.Label>
                <Form.Control onChange={this.handleChange} size="md" name="password" value={this.state.credentials.password} type="password" placeholder="Enter your Password" /><br />
                
                <Button onClick={this.login} style={{textAlign:'center',position:'relative',width:'100px',left:'40%'}} variant="info">Log In</Button><br/>
                {this.state.errorMessage ?
                <div>
                <Button onClick={this.signup} style={{textAlign:'center'}} variant="info">Sign Up</Button>
                
                </div>
                 : null}
            </Form.Group>
            </div>
            </div>
            </div>
        )
    }
}

export default withCookies(Login);