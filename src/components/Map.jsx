import React, { useRef, useState } from "react";

import GoogleMapReact from "google-map-react";

const MARKER_IMG = require("../assets/person_better.png");
const RED_MARKER_IMG = require("../assets/RedMarker.png");
const YELLOW_MARKER_IMG = require("../assets/YellowMarker.png");
const BLUE_MARKER_IMG = require("../assets/BlueMarker.png");

const getLocation = callback => {
    navigator.geolocation.getCurrentPosition(pos => {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

        callback({ lat, lng });
    });
};

const Marker = props => {
    return (
        <img src={MARKER_IMG} style={{width: "30px", height: "70px"}} alt={"marker"}/>
    );
}

const ResultMarker = ({ rank }) => {
  let markerImg;

  switch (rank) {
    case 0:
      markerImg = RED_MARKER_IMG;
      break;
    case 1:
      markerImg = YELLOW_MARKER_IMG;
      break;
    default:
      markerImg = BLUE_MARKER_IMG;
  }

  return (
    <img src={markerImg} style={{width: "20px", height: "20px"}} alt={"marker"}/>
  );
};

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

const Map = ({ apiKey, styleURL, onClick, points, results }) => {
    const map = useRef();

    const [mapPos, setMapPos] = useState({
        center: { lat: 54.776, lng: -1.5753 },
        zoom: 15,
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

                {results.map((point, i) => 
                    <ResultMarker key={i} rank={i} lat={point.lat} lng={point.lng} zoom={map.current.zoom}/>)
                }
            </GoogleMapReact>
        </div>
    );;
}

export { Map };