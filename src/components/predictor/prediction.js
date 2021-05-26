import React, { Component } from 'react'
import Navigation from '../navbar';
import {Form,Row,Col,Button,Alert} from 'react-bootstrap';
import axios from 'axios';
import ReactMapGL, {Marker, NavigationControl,GeolocateControl} from 'react-map-gl';
import Geocoder from 'react-mapbox-gl-geocoder';
import Pin from '../property-management/pin';
import Footer from '../footer';
export default class Prediction extends Component {
    state={
        City:'',
        Location:'',
        Size:'',
        baths:'',
        beds:'',
        Units:'',
        Type:'',
        prediction:null,
        percentage:null,
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
    }
    reset = () =>{
        this.setState({
        City:'',
        Location:'',
        Size:'',
        baths:'',
        beds:'',
        Units:'',
        Type:'',
        })
    }
    handleChange = (event) =>{
        const value = event.target.value;
       this.setState({
         [event.target.name]: value
       });
    };
    evaluate = (e) =>{
        e.preventDefault();
        if (this.state.City=='Islamabad'){
            this.setState({Islamabad:'1',Rawalpindi:'0',Karachi:'0',Lahore:'0'})
        }else{
            if(this.state.City=='Karachi'){
                this.setState({Islamabad:'0',Rawalpindi:'0',Karachi:'1',Lahore:'0'})        
            }else{
                if(this.state.City=='Lahore'){
                    this.setState({Islamabad:'0',Rawalpindi:'0',Karachi:'0',Lahore:'1'})        
                }else{
                    if (this.state.City=='Rawalpindi'){
                        this.setState({Islamabad:'0',Rawalpindi:'1',Karachi:'0',Lahore:'0'})
                    }else{
                        this.setState({Islamabad:'0',Rawalpindi:'0',Karachi:'0',Lahore:'0'})    
                    }
                }  
            }
        }
        let form_data = new FormData();
        form_data.append('latitude',this.state.marker.latitude);
        form_data.append('longitude',this.state.marker.longitude);
        form_data.append('beds',this.state.beds);
        form_data.append('baths',this.state.baths);
        form_data.append('Size',this.state.Size);
        form_data.append('Units',this.state.Units);
        form_data.append('City',this.state.City);
        form_data.append('Type',this.state.Type);
        let url = 'http://127.0.0.1:4000/api/model/';
        axios.post(url,form_data,{
          headers:{
            'content-type':'multipart/form-data',
          }
        }).then(res=>this.setState({prediction:res.data,percentage:Number(res.data)*0.1})).catch(error=>this.setState({error:error}));
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
    render() {
        const {viewport, marker} = this.state;
        return (
            <div  style={{backgroundColor:'#fcfbff'}}>
                <Navigation linkColor="black" color="#f5f8fa" />
                <div style={{marginTop:'6%'}} className="Form">
                <h1 className="text-center" style={{fontFamily:'Oswald',fontSize:'50px',color:'#bbbcbe',fontWeight:'bold'}}>Property Evaluation</h1><br/>
                <p style={{fontWeight:'light',fontSize:'14px'}} className="text-center">This is the property price prediction page. If you are a buyer or a seller and want to predict the price of a property you want to sell or buy then this is the right place for you. You can use our online property valuation predictor in order to predict the value of your desired or listed property. Please enter the details of the property you want to value and press on the evalute button in order to find the value of the property.
                Remember this property value estimator won't give you exact accurate value of the property and may not be True always. The main purpose of it is to provide you with an estimate of how much would be the property you are looking for is worth.</p><br/><br/>
                <Form>
                    <Form.Group>
                        <div >
                        <Row style={{marginLeft:'5%'}}>
                        <Col lg={6} md={12} sm={12} style={{width:'50%',position:'relative',right:'5%'}}>
                        <Form.Control size="md" onChange={e=>this.handleChange(e)} value={this.state.City} name="City" type="text" placeholder="City" /><br/><br/>
                        <Form.Control size="md" onChange={e=>this.handleChange(e)} value={this.state.location} name="Location" type="text" placeholder="Location of your Property" /><br/><br/>
                        <Form.Control size="md" onChange={e=>this.handleChange(e)} value={this.state.Size} name="Size" type="text" placeholder="Size of your Property" /><br/><br/>
                        <Form.Control size="md" onChange={e=>this.handleChange(e)} value={this.state.beds} name="beds" type="text" placeholder="No of bedrooms" /><br/><br/>
                        <Form.Control size="md" onChange={e=>this.handleChange(e)} value={this.state.baths} name="baths" type="text" placeholder="No of baths" /><br/><br/>
                        <Row>
                            <Col lg={6} md={6}>
                            <Form.Control value={this.state.Units} name='Units' onChange={this.handleChange} size="md" as="select">
                                        <option value="square_yards">Square Yards</option>
                                        <option value="square_meters">Square Meters</option>
                                        <option value="marla">Marla</option>
                                        <option value="kanal">Kanal</option>
                                        </Form.Control>
                        
                            </Col>
                            <Col lg={6} md={6}>
                            <Form.Control value={this.state.Type} name='Type' onChange={this.handleChange} size="md" as="select">
                                        <option value="house">House</option>
                                        <option value="plot">Plot</option>
                                        <option value="commercial_area">Commercial Area</option>
                                        <option value="flat">Flat</option>
                                        </Form.Control>
                        
                            </Col>
                        </Row>
                        <br/><br />
                        </Col>                       <Col lg={6} md={12} sm={12} style={{width:'70%',position:'relative',right:'5%'}}>
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


      </ReactMapGL></Col>
      </Row><br/>
      {this.state.prediction != null ? <div> 
      <Alert variant='warning'>Estimated price range for your property is: <b>Rs. {Math.round(Number(this.state.prediction)-Number(this.state.percentage))} - {Math.round(Number(this.state.prediction)+Number(this.state.percentage))}</b> </Alert><Alert variant='success'>Estimated exact price for your property is:<b> Rs. {Math.round(this.state.prediction)} </b></Alert></div>
                        :null}
                        <Row style={{marginTop:'5%',width:'60%',position:'relative',left:'20%'}}>
                            <Col lg={6} md={6}>
                                <Button onClick={this.evaluate} className="btn btn-block btn-dark">Evaluate</Button>
                            </Col>
                            <Col lg={6} md={6}>
                                <Button onClick={this.reset} className="btn btn-block btn-danger">Reset Form</Button>
                            </Col>
                        </Row><br/><br/>
                        </div>
                    </Form.Group>
                </Form>
                </div>
            </div>
        )
    }
}
