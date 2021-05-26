import React, { Component } from 'react'
import {withCookies} from 'react-cookie';
import Navigation from '../navbar';
import {Form,Button,Row,Col} from 'react-bootstrap';
import axios from 'axios';
class EditProfile extends Component {
    state={
        token:this.props.cookies.get('adtoken'),
        CNIC:'',
        Name:'',
        Age:'',
        Gender:'',
    }
    
    getProfiles = () =>{
        fetch(`http://127.0.0.1:4000/api/myProfile`,{
              method : 'GET',
              headers:{
                'Authorization':`Token ${this.state.token}`
              }
              }).then(resp=>resp.json()).then(res=>this.setState({
                  Name:res[0].Full_Name,
                  Gender:res[0].Gender,
                  Age:res[0].Age,
                })).catch(error=>console.log(error));
      }
   
  handleChange = (event) =>{
    const value = event.target.value;
   this.setState({
     [event.target.name]: value
   });
};
handleSubmit = (e) =>{
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('Full_Name',this.state.Name);
    form_data.append('Age',this.state.Age);
    form_data.append('CNIC',this.state.CNIC);
    form_data.append('Gender',this.state.Gender);
    const { handle } = this.props.match.params
    let url = `http://127.0.0.1:4000/api/UpdateProfile/${handle}/`;
    axios.put(url,form_data,{
      headers:{
        'content-type':'multipart/form-data',
        'Authorization': `Token ${this.state.token}`
      }
    }).then(res=>console.log(res)).catch(error=>this.setState({error:error}));
    if(!this.state.error){
      window.location.href='/dashboard'
    }
}
componentDidMount(){
    this.getProfiles()
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
                        <h1 style={{fontFamily:'Oswald',fontSize:'50px',fontWeight:'bold',textAlign:'center'}}>Update Your Profile</h1><br />
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

export default withCookies(EditProfile)