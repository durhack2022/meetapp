import { useState } from "react";

import { Map } from "./Map";

const Body = ({
    apiKey,
    styleURL,
}) => {
    let [markers, setMarkers] = useState([]);

    let onMapClick = event => {
        let { lat, lng } = event;
        let newMarkers = [...markers, {lat, lng}]; 
        console.log("onmapclick", newMarkers);
        setMarkers(newMarkers);
    };
  
    return (
        <Map apiKey={apiKey}
            styleUrl={styleURL} 
            onClick={onMapClick}
            points={markers}
        /> );
};

export { Body };
