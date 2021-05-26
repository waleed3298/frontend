import React,{Component} from 'react';
import Navigation from '../navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import './authentication.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

class SignUp extends Component{
    state = {
        error:'',
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
    .catch( error => this.setState({error:error}))
    }
    handleClick = () =>{
        if (this.state.credentials.password!==this.state.credentials.password2){
            this.setState({error:"Passwords don't match!"})
        }
        else{
            if (this.state.credentials.username===''||this.state.credentials.email===''){
                this.setState({error:'Username or email invalid'})
            }
            else{
                this.storeData()
            }
        }
    }
    home = () =>{
        window.location.href="/"
    }
    render(){
        return (
            <div>
            <Link to="/">
            <h1 className="mt-4 mr-4" style={{color:'#556B2F',float:'right',fontFamily:'Parisienne',cursor:'pointer'}} onClick={this.home} ><i className="fa fa-fw fa-home" style={{ fontSize: '1em',position:'relative',top:'2px'}}/>Estate</h1>
            </Link><Row>
                <Col lg={3} md={3} sm={3} className="signup"><div id="div1" ><div style={{position:'relative',top:'80%',left:'10%'}}><h4 style={{color:'white'}}>Already Have an account?</h4><br/>
                <Link to='/login'>
                <button  style={{backgroundColor:'#556B2F',position:'relative',left:'12%',color:'white'}} className="btn btn-lg ml-3">Sign In</button></Link></div></div>
                </Col>
                <Col className="mt-4" style={{position:'relative',right:'10%'}} lg={9} md={9} sm={9}><div className="Form" style={{width:'80%',position:'relative',left:'25%'}}>
            <h1 className="mt-4" style={{textAlign:'center',position:'relative',top:'5%',color:'#9ACD32',fontFamily:'Oswald'}}>Create a new account</h1><br/>
            <h3 style={{textAlign:'left',position:'relative',left:'20%',color:'#9ACD32'}}>Sign Up</h3>
            <br/>
            <Form.Group style={{width:'60%',position:'relative',left:'20%'}}>
            {this.state.error ? <h6 className="text-center" style={{color:'tomato'}}>{this.state.error}</h6> : null}
                <Form.Control style={{backgroundColor:'#f4f6f7'}} size="md" onChange={this.handleChange} name="username" type="text" placeholder="Username" /><br />
                <Form.Control style={{backgroundColor:'#f4f6f7'}} size="md" onChange={this.handleChange} name="email" type="email" placeholder="Email" /><br />
                <Form.Control style={{backgroundColor:'#f4f6f7'}} size="md" onChange={this.handleChange} name="password" type="password" placeholder="Enter your Password" /><br />
                <Form.Control style={{backgroundColor:'#f4f6f7'}} size="md" onChange={this.handleChange} name="password2" type="password" placeholder="Retype Password" /><br/>
                <Form.Control style={{backgroundColor:'#f4f6f7'}} size="md" onChange={this.handleChange} name="contact_no" type="text" placeholder="Contact Number" /><br/>
                <Button onClick={this.handleClick} style={{textAlign:'center',position:'relative',width:'100px',left:'40%',backgroundColor:'#556B2F',color:'white'}} variant="info">Sign Up</Button>
            </Form.Group>
            </div>
            </Col>
            </Row>            
            </div>
        );
    }
}

export default SignUp;