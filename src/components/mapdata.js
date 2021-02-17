import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl,Marker, Popup,GeolocateControl } from "react-map-gl";
import Geocoder from 'react-mapbox-gl-geocoder';
import './map.css';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Data(props) {
const properties = props.data.properties;
  const [viewport, setViewport] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
    width: props.width,
    height: props.height,
    zoom: 13,
    errorMessage:null,
  });
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedProperty(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const onSelected = (viewport,item) =>{
  setViewport(viewport);
}
const URL = 'AdDetails/'
return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/waleed3298/ckid1zo1y1op21apb5ln1umo9"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
      {properties.map(property => (
        property.Type=='plot'?
          <Marker
            key={property.id}
            latitude={property.latitude}
            longitude={property.longitude}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedProperty(property);
              }}
            >
              <img src="/marker2.png" style={{color:'#3b6998'}} alt="Home icon" />
            </button>
          </Marker>
          : property.Type=='property'?
          <Marker
            key={property.id}
            latitude={property.latitude}
            longitude={property.longitude}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedProperty(property);
              }}
            >
              <img src="/marker3.png" style={{color:'#3b6998',width:'30px',height:'40px'}} alt="Home icon" />
            </button>
          </Marker> 
          : property.Type=='commercial'?
          <Marker
            key={property.id}
            latitude={property.latitude}
            longitude={property.longitude}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedProperty(property);
              }}
            >
              <img src="/marker4.png" style={{color:'#3b6998'}} alt="Home icon" />
            </button>
          </Marker>
          : null
        ))}
        {selectedProperty ? (
          <Popup style={{backgroundColor:'silver'}}
            latitude={selectedProperty.latitude}
            longitude={selectedProperty.longitude}
            onClose={() => {
              setSelectedProperty(null);
            }}
          >
            <div style={{fontFamily:'Lora'}}>
            <Row>
              <Col><Image style={{width:'150px',height:'150px',textAlign:'center'}}  src={selectedProperty.Image}></Image><br/>
              </Col>
              <Col style={{marginTop:'20px',marginRight:'50px'}}>
              <h3 style={{color:'#3b6998',fontWeight:'bold'}}> {selectedProperty.Title}</h3>
              <h6 className="text-muted">Price: {selectedProperty.Price}</h6>
              <h6 className="text-muted">Type: {selectedProperty.Type}</h6>
              <h6 className="text-muted">Size: {selectedProperty.Size} {selectedProperty.Units}</h6>
              <p>Property ID: {selectedProperty.id}</p>
              </Col>
            </Row>
              </div>
          </Popup>
        ) : null}
<NavigationControl style={{width:'10%'}} onViewportChange={viewport => setViewport(viewport)}/>
<Geocoder style={{width:'100px',borderRadius:'10px'}}
mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
onSelected={onSelected}
viewport={viewport}
hideOnSelect={true}
value=""
/>
<GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
        </ReactMapGL>
        </div>
  );
}
