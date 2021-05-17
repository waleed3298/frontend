import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../components.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './map.css';
import {withCookies} from 'react-cookie'
import Navigation from '../navbar';
import ReactMapGL, {Marker, NavigationControl,GeolocateControl} from 'react-map-gl';
import Geocoder from 'react-mapbox-gl-geocoder';
import Pin from './pin';
import Footer from '../footer';

class AddProperty extends Component{
  
  state={token:this.props.cookies.get('adtoken'),showHouseForm:false,showPlotForm:false,showCommercialForm:false,Ad_id:'',error:'',
  viewport: {
    latitude: 33.6844,
    longitude: 73.0479,
    zoom: 5.5,
    bearing: 0,
    pitch: 0
  },
  marker: {
    latitude: 33.6844,
    longitude: 73.0479
  },
  events: {},
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
  Featured:'',
  contact_no:'',
  cell_no:'',
  email:'',
  image : null,
  image1 : null,
  image2 : null,
  image3 : null,
  image4 : null,
  image5 : null,
};

  handleChange = (event) =>{
    const value = event.target.value;
   this.setState({
     [event.target.name]: value
   });
};
handlemultipleChange = (event) =>{
  const value = event.target.files[0];
 this.setState({
   [event.target.name]: value
 });
};
handleImageChange = (e) =>{
  this.setState({image:e.target.files[0]})
}
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
        form_data.append('Image',this.state.image,this.state.image.name);
        form_data.append('Featured',this.state.Featured)
        form_data.append('latitude',this.state.marker.latitude);
        form_data.append('longitude',this.state.marker.longitude);
        form_data.append('Image1',this.state.image1);
        form_data.append('Image2',this.state.image2);
        form_data.append('Image3',this.state.image3);
        form_data.append('Image4',this.state.image4);
        form_data.append('Image5',this.state.image5);
        form_data.append('email',this.state.email);
        form_data.append('contact_no',this.state.contact_no);
        form_data.append('cell_no',this.state.cell_no);
        
        let url = 'http://127.0.0.1:4000/api/CreateAd/';
        axios.post(url,form_data,{
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
      _updateViewport = viewport => {
        this.setState({viewport});
      };
    
      _logDragEvent(name, event) {
        this.setState({
          events: {
            ...this.state.events,
            [name]: event.lngLat
          }
        });
      }
    
      _onMarkerDragStart = event => {
        this._logDragEvent('onDragStart', event);
      };
    
      _onMarkerDrag = event => {
        this._logDragEvent('onDrag', event);
      };
    
      _onMarkerDragEnd = event => {
        this._logDragEvent('onDragEnd', event);
        this.setState({
          marker: {
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
          }
        });
      };
      
      onSelected = (viewport,item) =>{
        this.setState({viewport:viewport});
      }
    

      render(){
        const {viewport, marker} = this.state;
        return(
          <div>
                  {this.state.token ?
                    <div id="wrapper">
                    <Navigation linkColor="green" color="#fcfbff" />
                     <div className="Form">
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                        <div id="Form">
                        <h1 style={{fontFamily:'Oswald',fontSize:'50px',fontWeight:'bold',textAlign:'center'}}>Post your Listing</h1><br />
                        <h6 style={{textAlign:'left',fontFamily:'Lora',backgroundColor:'#556B2F',padding:'10px',borderRadius:'1px',color:'white'}}>Property Details</h6><br/>
                                <Form.Control size="md" name="Title" value={this.state.Title} onChange={e=>this.handleChange(e)} type="text" placeholder="Title for your Advertisement" /><br/>
                                <Form.Control value={this.state.Description} onChange={e=>this.handleChange(e)} placeholder="Description" name="Description" as="textarea" rows={3}/><br/>
                                
                                <Form.Control onChange={e=>this.handleChange(e)} size="md" name="Price" type="text" value={this.state.Price} placeholder="Asking Price of your property" />
                                <br/>
                            <Row>
                            <Col>
                                        <Form.Control size="md" onChange={e=>this.handleChange(e)} value={this.state.Size} name="Size" type="text" placeholder="Size of your Property" />
                            </Col>
                            <Col>
                                        <Form.Control value={this.state.Units} name='Units' onChange={this.handleChange} size="md" as="select">
                                        <option value="square_yards">Square Yards</option>
                                        <option value="square_meters">Square Meters</option>
                                        <option value="marla">Marla</option>
                                        <option value="kanal">Kanal</option>
                                        </Form.Control>
                                        <br />
                            </Col>
                            </Row>       
                        <Form.Label>Image</Form.Label>
                        <input type="file" id="image" accept="image/jpg,image/png" onChange={this.handleImageChange} required />
                                <br />
                        <Form.Group as="radio" value={this.state.Type} onChange={this.handleChange}>
                        </Form.Group>
                        <br />
                        <h6 style={{textAlign:'left',fontFamily:'Lora',backgroundColor:'#556B2F',padding:'10px',borderRadius:'1px',color:'white'}}>Location Details</h6><br/>
                            <Form.Control onChange={e=>this.handleChange(e)} value={this.state.City} size="md" name="City" type="text" placeholder="Enter Your City" /><br/>
                            <Form.Control onChange={e=>this.handleChange(e)} value={this.state.Location} size="md" name="Location" type="text" placeholder="Location" /><br/>
                        <Form.Label>Select Location from Map</Form.Label>        
                <ReactMapGL
        {...viewport}
        width="100%"
        height="75vh"
        mapStyle="mapbox://styles/waleed3298/ckid1zo1y1op21apb5ln1umo9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={this._onMarkerDragStart}
          onDrag={this._onMarkerDrag}
          onDragEnd={this._onMarkerDragEnd}
        >
          <Pin size={20} /> 
         </Marker>
         <Geocoder style={{width:'100px'}}
mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
onSelected={this.onSelected}
viewport={viewport}
hideOnSelect={true}
value=""
/>

          <NavigationControl onViewportChange={this._updateViewport} />
          <GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />


      </ReactMapGL>
      <br/><br/>        <h6 style={{textAlign:'left',fontFamily:'Lora',backgroundColor:'#556B2F',padding:'10px',borderRadius:'1px',color:'white'}}>Property Type and Information</h6><br/>
                
                        <Form.Label>Property Type</Form.Label>
                        <Row>
                        <Col><Form.Check  name="Type" value="property" type="radio" label="House"></Form.Check></Col>
                        <Col><Form.Check  name="Type" value="plot" type="radio" label="Plot"></Form.Check></Col>
                        <Col><Form.Check  name="Type" value="commercial" type="radio" label="Commercial"></Form.Check></Col>
                        </Row>
                        <br/>  
                            <Row>
                            <Col>
                            <Form.Control value={this.state.Beds} onChange={e=>this.handleChange(e)} size="md" name="Beds" type="text" placeholder="Bedrooms" />

                            </Col>
                            <Col>
                            <Form.Control value={this.state.Baths} onChange={e=>this.handleChange(e)} size="md" name="Baths" type="text" placeholder="Bathrooms" />
                                        <br />

                            </Col>
                            </Row>
                                        <Form.Control name="Construction_status" value={this.state.Construction_status} onChange={this.handleChange} size='md' as='select'>
                                        <option value="">Construction Status</option>
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
                            <Form.Label className="mt-1">Featured</Form.Label>
                        <Form.Group as="radio" value={this.state.Type} onChange={this.handleChange}>
                        <Row>
                        <Col><Form.Check  name="Featured" value="True" type="radio" label="Yes"></Form.Check></Col>
                        <Col><Form.Check  name="Featured" value="False" type="radio" label="No"></Form.Check></Col>
                        </Row>
                        </Form.Group>
                        <br/>
                        <h6 style={{textAlign:'left',fontFamily:'Lora',backgroundColor:'#556B2F',padding:'10px',borderRadius:'1px',color:'white'}}>Upload Images for Advertisement</h6><br/>
                        <input type="file" name="image1" id="image" accept="image/jpg,image/png" onChange={this.handlemultipleChange} />
                        <input type="file" name="image2" id="image" accept="image/jpg,image/png" onChange={this.handlemultipleChange} />
                        <input type="file" name="image3" id="image" accept="image/jpg,image/png" onChange={this.handlemultipleChange} />
                        <input type="file" name="image4" id="image" accept="image/jpg,image/png" onChange={this.handlemultipleChange} />
                        <input type="file" name="image5" id="image" accept="image/jpg,image/png" onChange={this.handlemultipleChange} />
                        <br/><br/><h6 style={{textAlign:'left',fontFamily:'Lora',backgroundColor:'#556B2F',padding:'10px',borderRadius:'1px',color:'white'}}>Owner Details</h6><br/>
                                <Form.Control size="md" name="contact_no" value={this.state.contact_no} onChange={e=>this.handleChange(e)} type="text" placeholder="Contact Number" /><br/>
                                <Form.Control size="md" name="cell_no" value={this.state.cell_no} onChange={e=>this.handleChange(e)} type="text" placeholder="Cell Number" /><br/>
                                <Form.Control size="md" name="email" value={this.state.email} onChange={e=>this.handleChange(e)} type="text" placeholder="Email" /><br/>
                        
                        </div>
                        <br />
                            <br/>
                     <br />
                    <br/>
      <Button className="btn btn-lg" style={{backgroundColor:'#556B2F',position:'relative',left:'40%',marginBottom:'100px',width:'20%'}} type="submit" >Submit Form</Button>
      </Form.Group>
                      </Form>
                </div>
                <Footer color="#556B2F" />
      </div>             :
                   window.location.href = '/login'}
                   </div>
)
          }
}

export default withCookies(AddProperty);
