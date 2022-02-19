import { useState, useEffect } from "react";


import Map from "./Map";

const Body = ({
    apiKey,
    styleURL,
}) => {
    let [markers, setMarkers] = useState([]);

    let onMapClick = event => {
        let { lat, lng } = event;
        setMarkers(markers.concat({lat, lng}));
    };
  
    return (
        <Map apiKey={apiKey}
            styleUrl={styleURL} 
            onClick={onMapClick}
            points={markers}
        /> );
};
