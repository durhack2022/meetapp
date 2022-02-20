import { useState } from "react";

import { Button, Grid, GridItem, VStack } from '@chakra-ui/react';

import { Map } from "./Map";
import { Sidebar } from "./Sidebar";

const Body = ({
    apiKey,
    styleURL,
}) => {
    let [markers, setMarkers] = useState([]);

    const onMapClick = event => {
        let { lat, lng } = event;        
        setMarkers((markers) =>  [...markers, {lat, lng}])
    };

    const handleSubmit = searchTerm => {
        console.log("searched for", searchTerm);
    };

    const handleClearMarkers = event => {
        event.preventDefault();
        setMarkers([]);
    }
  
    return (
        <Grid templateColumns={"repeat(9, 1fr)"}>
            <GridItem colSpan={7}>
                <Map apiKey={apiKey}
                    styleUrl={styleURL}
                    onClick={onMapClick}
                    points={markers}
                />    
            </GridItem>
            <GridItem colSpan={2}>
                <Sidebar placeholder={"where do you want to go?"} 
                    onSubmit={handleSubmit}
                    onClearMarkers={handleClearMarkers}
                />
            </GridItem>
        </Grid>
    );
};

export { Body };
