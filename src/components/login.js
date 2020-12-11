import React,{Component} from 'react';
import Navigation from './navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {withCookies} from 'react-cookie';

class Login extends Component{
    state = {
        credentials:{
            username:'',password:''
        }
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
        this.props.cookies.set('ad-token',data.token)
        window.location.href = '/advertisements'
      }
    )
    .catch( error => console.error(error))
    
    }
    login = () =>{
        this.getToken()
    }

    render(){
        return (
            <div>
            <Navigation color="Black" />
            <div className="Form">
            <h1 className="text-info mt-4" style={{textAlign:'center'}}>Login</h1>
            <br/>
            <Form.Group>
            <Form.Label>Username:</Form.Label>
                <Form.Control onChange={this.handleChange} name="username" value={this.state.credentials.username} size="md" type="text" placeholder="Username" /><br />
            <Form.Label>Password:</Form.Label>
                <Form.Control onChange={this.handleChange} size="md" name="password" value={this.state.credentials.password} type="password" placeholder="Enter your Password" /><br />
                <Button onClick={this.login} style={{textAlign:'center'}} variant="info">Log In</Button>
            </Form.Group>
            </div>
            </div>
        )
    }
}

export default withCookies(Login);