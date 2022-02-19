import React from "react";

import GoogleMapReact from "google-map-react";

const getLocation = callback => {
    navigator.geolocation.getCurrentPosition(pos => {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

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
        this.points = props.points;

        this.map = null;
    }

    apiIsLoaded(map, maps) {
        if (map) {
            this.map = map;

            let newState = this.state;

            getLocation(loc => {
                newState.center = loc;
                this.setState(newState);
    
                if (this.map) {
                    this.map.panTo(
                        new window.google.maps.LatLng(newState.center.lat, newState.center.lng)
                    );
                }
            });

        } 
    }

    componentDidMount() {
        let newState = this.state;

        getLocation(loc => {
            newState.center = loc;
            this.setState(newState);

            if (this.map) {
                this.map.panTo(
                    new window.google.maps.LatLng(newState.center.lat, newState.center.lng)
                );
            }
        });
    }

    componentDidUpdate(oldProps) {
        console.log("new points:", this.points);
    }

    render() {
        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: this.apiKey}}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    onClick={this.onClick}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
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