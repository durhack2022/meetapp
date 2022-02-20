import React, { useRef, useState } from "react";

import GoogleMapReact from "google-map-react";
// import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'


const MARKER_IMG = require("../assets/marker2.png");

const getLocation = callback => {
    navigator.geolocation.getCurrentPosition(pos => {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

        callback({ lat, lng });
    });

};

const Marker = props => {
    return (
        <img src={MARKER_IMG} style={{width: "20px", height: "20px"}} alt={"marker"}/>
    );
}

const mapOptions = [
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];

const Map = ({ apiKey, styleURL, onClick, points }) => {
    const map = useRef();

    const [mapPos, setMapPos] = useState({
        center: { lat: 54.776, lng: -1.5753 },
        zoom: 16,
    });

    const apiIsLoaded = newMap => {
        if (newMap) {
            map.current = newMap;

            getLocation(loc => {
                let newPos = mapPos;
                newPos.center = loc;
                setMapPos(newPos);
    
                if (newMap) {
                    newMap.panTo(
                        new window.google.maps.LatLng(newPos.center.lat, newPos.center.lng)
                    );
                }
            });

        }
    };


    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{key: apiKey}}
                defaultCenter={mapPos.center}
                defaultZoom={mapPos.zoom}
                onClick={onClick}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map }) => apiIsLoaded(map)}
                options={mapOptions}
            >
                {points.map((point, i) => 
                    <Marker key={i} lat={point.lat} lng={point.lng} zoom={map.current.zoom}/>)
                }
            </GoogleMapReact>
        </div>
    );;
}

export { Map };