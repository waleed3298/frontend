import React,{Component} from 'react';
import Navigation from './navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class SignUp extends Component{
    render(){
        return (
            <div>
            <Navigation color="Black" />
            <div className="Form">
            <h1 className="text-info mt-4" style={{textAlign:'center'}}>Sign Up</h1>
            <br/>
            <Form.Group>
                <Form.Control size="md" type="text" placeholder="Username" /><br />
                <Form.Control size="md" type="email" placeholder="Email" /><br />
                <Form.Control size="md" type="password" placeholder="Enter your Password" /><br />
                <Form.Control size="md" type="password" placeholder="Retype Password" /><br/>
                <Button style={{textAlign:'center'}} variant="info">Sign Up</Button>
            </Form.Group>
            </div>
            </div>
        );
    }
}

export default SignUp;