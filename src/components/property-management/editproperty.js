import React,{Component} from 'react';
import Navigation from '../navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../components.css';
import Button from 'react-bootstrap/Button';
import Footer from '../footer';
import axios from 'axios';

class EditProperty extends Component{
state = { postId:'',
Title:'',
  Description:'',
  Type:'',
  Location:'',
  Construction_status:'',
  Price:'',
  Size:'',
  Units:'',
  City:'',
  Beds:'',
  Baths:'',
  Purpose:'',}

componentDidMount(){
  const { handle } = this.props.match.params     
    fetch(`http://127.0.0.1:4000/api/Edit/${handle}/`,{
            method : 'GET'
            }).then(resp=>resp.json()).then(res=>this.setState({
                'Title':res.Title,
                'id':res.id,
                'Description':res.Description,
                'Price':res.Price,
                'Size':res.Size,
                'Units':res.Units,
                'Beds':res.Beds,
                'Baths':res.Baths,
                'Construction_status':res.Construction_status,
                'User':res.User,
                'Purpose':res.Purpose,
                'City':res.City,
                'Type':res.Type,
                'Location':res.Location,

            })).then(res=>console.log(this.state.Type)).catch(error=>console.log(error));       
}
handleImageChange = (e) =>{
  this.setState({image:e.target.files[0]})
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
      form_data.append('Title',this.state.Title);
      form_data.append('Description',this.state.Description);
      form_data.append('Type',this.state.Type);
      form_data.append('Location',this.state.Location);
      form_data.append('Construction_status',this.state.Construction_status);
      form_data.append('Price',this.state.Price);
      form_data.append('Size',this.state.Size);
      form_data.append('Units',this.state.Units);
      form_data.append('City',this.state.City);
      form_data.append('Beds',this.state.Beds);
      form_data.append('Baths',this.state.Baths);
      form_data.append('Purpose',this.state.Purpose);
      const { handle } = this.props.match.params
      let url = `http://127.0.0.1:4000/api/Edit/${handle}/`;
      axios.put(url,form_data,{
        headers:{
          'content-type':'multipart/form-data',
          'Authorization': `Token ${this.state.token}`
        }
      }).then(res=>console.log(res)).catch(error=>this.setState({error:error}));
      if(this.state.error){
        return <h1>{this.state.error}</h1>
      }
      else{
        window.location.href="/dashboard"
      }
    }
   
    render(){
        return (
          <div style={{backgroundColor:'#f5f8fa',height:'100%'}}><Navigation linkColor="#233443"  color="#fcfbff" />      
        <div className='Form'>
            <Form onSubmit={this.handleSubmit}>
                      <Form.Group>
                      <h1 style={{textAlign:'center',fontWeight:'bold',fontSize:'50px',fontFamily:'Oswald',marginTop:'50px'}}>Edit Your Advertisement</h1><br />
                      <div id="Form">
                      <h6 style={{textAlign:'left',fontFamily:'Lora',backgroundColor:'#556B2F',padding:'10px',borderRadius:'1px',color:'white'}}>Property Details</h6> 
                      <Form.Label>Listing Title</Form.Label>
                              <Form.Control size="md" name="Title" value={this.state.Title} onChange={e=>this.handleChange(e)} type="text" placeholder="Title for your Advertisement" />
                              <br />
                              <Form.Label>Description</Form.Label>
                              <Form.Control value={this.state.Description} onChange={e=>this.handleChange(e)} name="Description" as="textarea" rows={3}/>
                              <br />
                              <Form.Label>Price</Form.Label>
                              <Form.Control onChange={e=>this.handleChange(e)} size="md" name="Price" type="text" value={this.state.Price} placeholder="Asking Price of your property" />
                              <br />
                          <Row>
                          <Col>
                          <Form.Label>Size</Form.Label>
                                      <Form.Control size="md" onChange={e=>this.handleChange(e)} value={this.state.Size} name="Size" type="text" placeholder="Size of your Property" />
                          </Col>
                          <Col>
                          <Form.Label>Units</Form.Label>
                                      <Form.Control value={this.state.Units} name='Units' onChange={this.handleChange} size="md" as="select">
                                      <option value="square_yards">Square Yards</option>
                                      <option value="square_metres">Square Metres</option>
                                      <option value="marla">Marla</option>
                                      <option value="kanal">Kanal</option>
                                      </Form.Control>
                                      <br />

                          </Col>
                          </Row>
                          <h6 style={{textAlign:'left',fontFamily:'Lora',backgroundColor:'#556B2F',padding:'10px',borderRadius:'1px',color:'white'}}>Location Details</h6> 
                          <br/>
                          <Form.Label>City</Form.Label>
                          <Form.Control onChange={e=>this.handleChange(e)} value={this.state.City} size="md" name="City" type="text" placeholder="Enter Your City" />
                          <br />
                          <Form.Control onChange={e=>this.handleChange(e)} value={this.state.Location} size="md" name="Location" type="text" placeholder="Location" />
                             <br />
                             <h6 style={{textAlign:'left',fontFamily:'Lora',backgroundColor:'#556B2F',padding:'10px',borderRadius:'1px',color:'white'}}>Property Type and Details</h6> 
                               <br/>  <Row>
                          <Col>
                          <Form.Label>Bedrooms</Form.Label>
                          <Form.Control value={this.state.Beds} onChange={e=>this.handleChange(e)} size="md" name="Beds" type="text" placeholder="Bedrooms" />

                          </Col>
                          <Col>
                          <Form.Label>Bathrooms</Form.Label>
                          <Form.Control value={this.state.Baths} onChange={e=>this.handleChange(e)} size="md" name="Baths" type="text" placeholder="Bathrooms" />
                                      <br />

                          </Col>
                          </Row>
                          <Row>
                            <Col><Form.Label>Property Type</Form.Label>
                                      <Form.Control name="Type" value={this.state.Type} onChange={this.handleChange} size='md' as='select'>
                                      <option value="property">House</option>
                                      <option value="plot">Plot</option>
                                      <option value="commercial_area">Commercial Area</option>
                                      <option value="flat">Flat</option>
                                 </Form.Control>
                      <br /></Col>
                            <Col><Form.Label>Construction Status</Form.Label>
                                      <Form.Control name="Construction_status" value={this.state.Construction_status} onChange={this.handleChange} size='md' as='select'>
                                      <option value="complete">Please Select</option>
                                      <option value="complete">Complete</option>
                                      <option value="under_construction">Under Construction</option>
                          </Form.Control>
                          </Col>
                          </Row><br/>
                          <Form.Label>Purpose</Form.Label>
                          <Form.Group value={this.state.Purpose} onChange={this.handleChange}>
                          <Row>
                          <Col><Form.Check onClick={this.HouseForm} name="Purpose" value="sale" type="radio" label="Sale"></Form.Check></Col>
                          <Col><Form.Check onClick={this.PlotForm} name="Purpose" value="rent" type="radio" label="Rent"></Form.Check></Col>
                          </Row>
                          </Form.Group>
                          <br />
                          <br/>
                          <Button type='submit' style={{backgroundColor:'#556B2F',position:'relative',left:'30%',width:'200px'}} type="submit">Submit Form</Button><br/><br/>
</div>
                  <br />
                </Form.Group>
              </Form>
            </div> <br/><br/>
            <Footer color="#556B2F" />
            </div>
        )
    }
}

export default EditProperty;