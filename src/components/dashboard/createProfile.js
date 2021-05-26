import React, { Component } from 'react'
import {withCookies} from 'react-cookie';
import Navigation from '../navbar';
import {Form,Button,Row,Col} from 'react-bootstrap';
import axios from 'axios';
class CreateProfile extends Component {
    state={
        token:this.props.cookies.get('adtoken'),
        Name:'',
        Age:'',
        CNIC:'',
        Gender:'',
    }
  handleChange = (event) =>{
    const value = event.target.value;
   this.setState({
     [event.target.name]: value
   });
};
handleSubmit = (e) =>{
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('Full_Name',this.state.Name);
    form_data.append('Age',this.state.Age);
    form_data.append('CNIC',this.state.CNIC);
    form_data.append('Gender',this.state.Gender);
    let url = 'http://127.0.0.1:4000/api/CreateProfile/';
    axios.post(url,form_data,{
      headers:{
        'content-type':'multipart/form-data',
        'Authorization': `Token ${this.state.token}`
      }
    }).then(res=>console.log(res)).catch(error=>this.setState({error:error}));
    if (!this.state.error){
        window.location.href="/dashboard"
    }
}
  
    render() {
        return (
            <div>
                <div>
                    <div id="wrapper">
                    <Navigation linkColor="green" color="#fcfbff" />
                     <div style={{marginTop:'5%'}} className="Form">
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                        <div id="Form">
                        <h1 style={{fontFamily:'Oswald',fontSize:'50px',fontWeight:'bold',textAlign:'center'}}>Create Your Profile</h1><br />
                                <Form.Control size="md" name="Name" value={this.state.Name} onChange={e=>this.handleChange(e)} type="text" placeholder="Full Name" /><br/>
                                <Form.Control value={this.state.Age} onChange={e=>this.handleChange(e)} placeholder="Age" name="Age" type="text" rows={3}/><br/>
                                        <Form.Control value={this.state.Gender} name='Gender' onChange={this.handleChange} size="md" as="select">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        </Form.Control>
                                        <br />
                            <Form.Control onChange={e=>this.handleChange(e)} value={this.state.CNIC} size="md" name="CNIC" type="text" placeholder="Enter Your CNIC (Optional)" /><br/>
      <br/><br/>        
                        </div>
                        <br />
                            <br/>
      <Button className="btn btn-block" style={{backgroundColor:'#556B2F',position:'relative',left:'40%',marginBottom:'100px',width:'20%'}} type="submit" >Save</Button>
      </Form.Group>
                      </Form>
                </div>
      </div>             
                   </div>

            </div>
        )
    }
}

export default withCookies(CreateProfile)