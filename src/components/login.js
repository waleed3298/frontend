import React,{Component} from 'react';
import Navigation from './navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends Component{
    render(){
        return (
            <div>
            <Navigation color="Black" />
            <div className="Form">
            <h1 className="text-info mt-4" style={{textAlign:'center'}}>Login</h1>
            <br/>
            <Form.Group>
                <Form.Control size="md" type="text" placeholder="Username" /><br />
                <Form.Control size="md" type="password" placeholder="Enter your Password" /><br />
                <Button style={{textAlign:'center'}} variant="info">Log In</Button>
            </Form.Group>
            </div>
            </div>
        )
    }
}

export default Login;