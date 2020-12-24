import React,{Component} from 'react';
import Navigation from '../navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import '../components.css';

class SignUp extends Component{
    state = {
        credentials:{
            username:'',
            password:'',
            password2:'',
            email : '',
        }
    }
    handleChange = (event) =>{
        const cred = this.state.credentials
        cred[event.target.name] = event.target.value
        this.setState({credentials:cred})
    }
    storeData = () =>{
        fetch('http://127.0.0.1:4000/api/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        console.log(data)
        window.location.href="/login"
      }
    )
    .catch( error => console.error(error))
    }

    handleClick = () =>{
        this.storeData()
    }
    render(){
        return (
            <div>
            <Navigation color="#34495E" />
            <div className="Form" style={{width:'50%',position:'relative',left:'25%'}}>
            <h1 className="text-info mt-4" style={{textAlign:'center'}}>Sign Up</h1>
            <br/>
            <Form.Group style={{width:'60%',position:'relative',left:'20%'}}>
                <Form.Control size="md" onChange={this.handleChange} name="username" type="text" placeholder="Username" /><br />
                <Form.Control size="md" onChange={this.handleChange} name="email" type="email" placeholder="Email" /><br />
                <Form.Control size="md" onChange={this.handleChange} name="password" type="password" placeholder="Enter your Password" /><br />
                <Form.Control size="md" onChange={this.handleChange} name="password2" type="password" placeholder="Retype Password" /><br/>
                <Button onClick={this.handleClick} style={{textAlign:'center',position:'relative',width:'100px',left:'40%'}} variant="info">Sign Up</Button>
            </Form.Group>
            </div>
            </div>
        );
    }
}

export default SignUp;