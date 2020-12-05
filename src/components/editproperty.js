import React,{Component} from 'react';
import Navigation from './navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './components.css';
import Button from 'react-bootstrap/Button';

class EditProperty extends Component{
state = { postId:'',
id:'',
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
Purpose:'',
User : ''
}

componentDidMount(){
    fetch("http://127.0.0.1:4000/api/Edit/8/",{
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



handleChange = (event) =>{
        const value = event.target.value;
       this.setState({
         [event.target.name]: value 
       });
    };
handleSubmit = (event) =>{
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      Title: this.state.Title,
      Description: this.state.Description,
      Size: this.state.Size,
      Price: this.state.Price,
      Units: this.state.Units,
      Type: this.state.Type,
      Purpose: this.state.Purpose,
      Beds: this.state.Beds,
      Baths: this.state.Baths,
      Construction_status: this.state.Construction_status, 
      City: this.state.City,
      Location: this.state.Location,
      User: this.state.User,
     })
};
fetch('http://127.0.0.1:4000/api/Edit/8/', requestOptions)
    .then(response => response.json())
    .then(data => this.setState({ postId: data.id }));
}

    render(){
        return (
            <div>
            <Navigation color='black' />
            <div className='Form'>
            <Form onSubmit={this.handleSubmit}>
                      <Form.Group>
                      <h1 style={{textAlign:'center'}}>Edit Your Advertisement</h1><br />
                      <h3 className="text-info" style={{textAlign:'center'}}>Property Type and Location</h3>
                      <Form.Label>Listing Title</Form.Label>
                              <Form.Control size="md" name="Title" value={this.state.Title} onChange={e=>this.handleChange(e)} type="text" placeholder="Title for your Advertisement" />
                              <br />
                      <Form.Label className="mt-1">Property Type</Form.Label>
                      <Form.Control as="radio" value={this.state.Type} onChange={this.handleChange}>
                      <Row>
                      <Col><Form.Check onClick={this.HouseForm} name="Type" value="property" type="radio" label="House"></Form.Check></Col>
                      <Col><Form.Check onClick={this.PlotForm} name="Type" value="plot" type="radio" label="Plot"></Form.Check></Col>
                      <Col><Form.Check onClick={this.CommercialForm} name="Type" value="commercial" type="radio" label="Commercial"></Form.Check></Col>
                      </Row>
                      </Form.Control>
                      <br />
                      <Form.Label>City</Form.Label>
                          <Form.Control onChange={e=>this.handleChange(e)} value={this.state.City} size="md" name="City" type="text" placeholder="Enter Your City" />
                          <br />
                          <Form.Control onChange={e=>this.handleChange(e)} value={this.state.Location} size="md" name="Location" type="text" placeholder="Location" />
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
                          <Row>
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
                          <Form.Label>Construction Status</Form.Label>
                                      <Form.Control name="Construction_status" value={this.state.Construction_status} onChange={this.handleChange} size='md' as='select'>
                                      <option value="complete">Please Select</option>
                                      <option value="complete">Complete</option>
                                      <option value="under_construction">Under Construction</option>
                          </Form.Control>
                          <Form.Label>Purpose</Form.Label>
                          <Form.Group value={this.state.Purpose} onChange={this.handleChange}>
                          <Row>
                          <Col><Form.Check onClick={this.HouseForm} name="Purpose" value="sale" type="radio" label="Sale"></Form.Check></Col>
                          <Col><Form.Check onClick={this.PlotForm} name="Purpose" value="rent" type="radio" label="Rent"></Form.Check></Col>
                          </Row>
                          </Form.Group>
                          <br />
                          <br/>
                          <Button type='submit' variant="info" type="submit">Submit Form</Button>

                  <br />
                </Form.Group>
              </Form>
            </div>
            </div>
        )
    }
}

export default EditProperty;