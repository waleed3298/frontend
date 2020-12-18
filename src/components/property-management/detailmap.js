import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl,Marker, Popup,GeolocateControl } from "react-map-gl";
import '../map.css';
import '../components.css';
export default function MapDetail(props) {
    const property = props.data
    const [viewport, setViewport] = useState({
    latitude: props.data.latitude,
    longitude: props.data.longitude,
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
    {property.latitude? 
        <ReactMapGL style={{position:'relative',left:'10%'}}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/waleed3298/ckid1zo1y1op21apb5ln1umo9"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
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
<NavigationControl onViewportChange={viewport => setViewport(viewport)}/>
<GeolocateControl
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
        </ReactMapGL>

     : <h1>Map location not  available</h1>}
              </div>
  )
        }

