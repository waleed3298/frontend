import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './components.css';
import axios from 'axios';
export default class LandingForm extends React.Component{
    state={
        City:'',
        beds:'',
        Construction_status:'',
        Type:'',
        toggle:false,
    }  
  toggleButton = () =>{
      this.setState({toggle:!this.state.toggle});
  }
  handleChange = (event) =>{
    const value = event.target.value;
   this.setState({
     [event.target.name]: value
   });
};
reset = () =>{
    this.setState({    
    City:'',
    beds:'',
    Location:'',
    Construction_status:'',
    Type:'',
})
}
handleClick = () =>{
  const url = `${this.state.City},${this.state.beds},${this.state.Construction_status},${this.state.Type}`
  window.location.href = `http://localhost:3000/search/${url}`;
}
handleSubmit = (e) =>{
    e.preventDefault();
    const url2 = `?search=${this.state.Type},${this.state.Location},${this.state.Construction_status},${this.state.City},`
    console.log(this.state);
    let url = 'http://127.0.0.1:4000/api/advertisements'+url2;
    axios.get(url,{
      headers:{
        'content-type':'multipart/form-data',
        'Authorization': `Token ${this.state.token}`
      }
    }).then(res=>this.setState({properties:res.data})).catch(error=>this.setState({error:error}));    
    this.setState({search:true})
    this.setState({clicked:true})
  }
    render(){
        return(
            <div style={{position:'relative',left:'10%',width:'80%'}} >
            <Form id="div" style={{position:'relative',width:'80%',paddingTop:'10px',borderRadius:'5px',height:'90%'}}><Form.Group>
                <div style={{position:'relative',left:'25px',width:'80%'}}>
                <h4 style={{position:'relative',left:'5%',color:'white'}}><b>Search for properties</b></h4><br/>
                                        <Form.Control className="ml-3"  value={this.state.City} name='City' onChange={this.handleChange} size="md" as="select">
                                        <option value="">City</option>
                                        <option value="Lahore">Lahore</option>
                                        <option value="Islamabad">Islamabad</option>
                                        <option value="Karachi">Karachi</option>
                                        <option value="Peshawar">Peshawar</option>
                                        <option value="Rawalpindi">Rawalpindi</option>
                                        <option value="Faisalabad">Faisalabad</option>
                                        <option value="Abbotabad">Abbotabad</option>
                                        <option value="Sargodha">Sargodha</option>
                                        <option value="Chakwal">Chakwal</option>
                                        <option value="Sialkot">Sialkot</option>
                                        </Form.Control><br/>
                </div>
                    <div style={{position:'relative',bottom:'5px',left:'10%',width:'90%',paddingTop:'10px',left:'20px'}}>
                    <div className="ml-4"><Form.Control style={{backgroundColor:'#f4f6f7',width:'95%'}} name="Type" value={this.state.Type} onChange={this.handleChange} size='md' as='select'>
                                        <option value="">Type</option>
                                        <option value="property">Homes</option>
                                        <option value="plot">Plots</option>
                                        <option value="commercial_areas">Commercial Areas</option>
                                        <option value="Flats">Flats</option>
                            </Form.Control>                         
                          </div><br/>
                     <Form.Control className="ml-4" style={{backgroundColor:'#f4f6f7',width:'89%'}} name="Construction_status" value={this.state.Construction_status} onChange={this.handleChange} size='md' as='select'>
                                        <option value="">Status</option>
                                        <option value="complete">Complete</option>
                                        <option value="under_construction">Under Construction</option>
                            </Form.Control><br/>                         
                           <div className="ml-4"><Form.Control style={{backgroundColor:'#f4f6f7',width:'95%'}} name="beds" value={this.state.beds} onChange={this.handleChange} size='md' as='select'>
                                        <option value="">Bedrooms</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                            </Form.Control>                         
                          </div><br/>
                          
                </div> 
                <Button onClick={this.reset} className="btn btn-block ml-3" style={{backgroundColor:'#32CD32',width:'80%',height:'100%',position:'relative',left:'6%',color:'white'}}>Reset Form</Button><br/>
                        <Button onClick={this.handleClick} className="btn btn-block ml-3" style={{backgroundColor:'#32CD32',width:'80%',height:'100%',position:'relative',left:'6%',color:'white'}}>Find</Button><br/>
                </Form.Group>
            </Form>
            </div>
        )
    }
}
