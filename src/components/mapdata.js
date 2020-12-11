import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl,Marker, Popup,GeolocateControl } from "react-map-gl";
import Geocoder from 'react-mapbox-gl-geocoder';
import './map.css';
export default function Data(props) {

const properties = props.data.properties;

  const [viewport, setViewport] = useState({
    latitude: 31.582045,
    longitude: 74.329376,
    width: props.width,
    height: props.height,
    zoom: 10,
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
              <img src="/home.png" alt="Home icon" />
            </button>
          </Marker>
        ))}

        {selectedProperty ? (
          <Popup
            latitude={selectedProperty.latitude}
            longitude={selectedProperty.longitude}
            onClose={() => {
              setSelectedProperty(null);
            }}
          >
            <div>
              <h2>{selectedProperty.Title}</h2>
              <h6>{selectedProperty.Type}</h6>
              <p>{selectedProperty.Description}</p>
            </div>
          </Popup>
        ) : null}
<NavigationControl style={{width:'10%'}} onViewportChange={viewport => setViewport(viewport)}/>
<Geocoder style={{width:'100px'}}
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
