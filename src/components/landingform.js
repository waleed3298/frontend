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
  const url = `City=${this.state.City}&Beds=${this.state.beds}&Construction_status${this.state.Construction_status},${this.state.Type}`
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
            <div style={{position:'relative',left:'10%',width:'90%'}} >
            <Form id="div" style={{position:'relative',width:'46vw',paddingTop:'20px',paddingBottom:'20px',borderRadius:'5px',height:'100%',right:'13vw'}}><Form.Group>
                <div style={{position:'relative',left:'25px',width:'90%'}}>
                <Row>
                  <Col lg={3}>                        <Form.Control className="ml-3"  value={this.state.City} name='City' onChange={this.handleChange} size="md" as="select">
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
                                        </Form.Control>
                </Col>
                  <Col lg={3}><Form.Control  name="Type" value={this.state.Type} onChange={this.handleChange} size='md' as='select'>
                                        <option value="">Type</option>
                                        <option value="property">Homes</option>
                                        <option value="plot">Plots</option>
                                        <option value="commercial_areas">Commercial Areas</option>
                                        <option value="Flats">Flats</option>
                            </Form.Control></Col>
                  <Col lg={3}><Form.Control className="mr-2" name="Construction_status" value={this.state.Construction_status} onChange={this.handleChange} size='md' as='select'>
                                        <option value="">Status</option>
                                        <option value="complete">Complete</option>
                                        <option value="under_construction">Under Construction</option>
                            </Form.Control>                         
                     </Col>
                  <Col lg={3}>
                  <Button onClick={this.handleClick} className="btn btn-block" style={{backgroundColor:'#ff6645',width:'80%',height:'100%',position:'relative',left:'6%',color:'white'}}>Find</Button>
                  </Col>
                </Row>
                </div>
                </Form.Group>
            </Form>
            </div>
        )
    }
}
