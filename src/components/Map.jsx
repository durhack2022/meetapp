import React from "react";
import { useState } from "react";

import GoogleMapReact from "google-map-react";

const mapSettings = {
    center: { lat: 54.776, lng: -1.5753 },
    zoom: 8,
};

const getLocation = callback => {
    console.log("called getlocation")

    return navigator.geolocation.getCurrentPosition(pos => {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;
        console.log("found location:", pos);

        callback({ lat, lng });
    });

};

class Map extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            center: { lat: 54.776, lng: -1.5753 },
            zoom: 16,
        }

        this.apiKey = props.apiKey;
        this.mapURL = props.mapURL;
        this.onClick = props.onClick;
    }

    componentDidMount() {
        console.log("component did mount");
        let newState = this.state;

        getLocation(loc => {
            console.log("got user location:", loc);
            newState.center = loc;
            this.setState(newState);
        });
    }
    
    render() {
        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: this.apiKey}}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    onClick={this.onClick}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

/*
const Map = ({
    apiKey,
    styleUrl,
    onClick,
    ...options
}) => {
    const [userLoc, setUserLoc] = useState({ lat: 54.776, lng: -1.5753 });
    const [mapRef, setMap] = useState(null);

    getLocation(location => {

    });

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{key: apiKey}}
                defaultCenter={userLoc}
                defaultZoom={mapSettings.zoom}
                onClick={onClick}
            >
            </GoogleMapReact>
        </div>
    );
};
*/

export { Map };