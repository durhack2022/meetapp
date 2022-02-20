import { useState } from "react";

import { Grid, GridItem, useDisclosure } from '@chakra-ui/react';

import { Map } from "./Map";
import { Sidebar } from "./Sidebar";
import { Popup } from "./Popup";
import { encodePoints, getCentroid } from "../utils";


const buildURL = (type, mode, points) => {
    const centroid = getCentroid(points);
    const url = `http://127.0.0.1:3080/getOptimalPlaces?type=${type}&lat=${centroid.lat}&lng=${centroid.lng}&mode=${mode}&originsList=${encodePoints(points)}`;
    return url;
};

const Body = ({
    apiKey,
    styleURL,
}) => {
    let [markers, setMarkers] = useState([]);
    let [places, setPlaces] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const onMapClick = event => {
        let { lat, lng } = event;        
        setMarkers((markers) =>  [...markers, {lat, lng}])
    };

    const handleSubmit = async searchTerm => {
        setPlaces([]);

        if (markers.length === 0) {
            onOpen();
            return;
        }

        const url = buildURL(searchTerm, "walking", markers);
        const res = await fetch(url);
        const body = await res.json();

        console.log("result:", body[0]);

        setPlaces(body[0]);
    };

    const handleClearMarkers = event => {
        event.preventDefault();
        setMarkers([]);
        setPlaces([]);
    }
  
    return (
        <>
            <Popup isOpen={isOpen}
                onClose={onClose} 
                title="Error"
                body="Select some locations by clicking on the map first"
            />
            <Grid templateColumns={"repeat(9, 1fr)"}>
                <GridItem colSpan={7}>
                    <Map apiKey={apiKey}
                        styleUrl={styleURL}
                        onClick={onMapClick}
                        points={markers}
                        results={places}
                    />    
                </GridItem>
                <GridItem colSpan={2}>
                    <Sidebar placeholder={"Where do you want to go?"} 
                        onSubmit={handleSubmit}
                        onClearMarkers={handleClearMarkers}
                        placeResults={places}
                    />
                </GridItem>
            </Grid>
        </>
    );
};

export { Body };
