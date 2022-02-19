import React, { useRef, useState } from "react";

import GoogleMapReact from "google-map-react";

const getLocation = callback => {
    navigator.geolocation.getCurrentPosition(pos => {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

        callback({ lat, lng });
    });

};

const markerStyle = {
    backgroundColor: "black",
    color: "white",
    width: "10px",
    height: "10px",
};

const Marker = props => {
    return (
        <div style={markerStyle}>
            !
        </div>
    )
}

const Map = ({ apiKey, styleUrl, onClick, points }) => {
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
            >
                {points.map((point, i) => 
                    <Marker key={i} lat={point.lat} lng={point.lng}/>)
                }
            </GoogleMapReact>
        </div>
    );;
}

export { Map };