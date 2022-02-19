import { useState } from "react";

import { SimpleGrid, GridItem } from '@chakra-ui/react';

import { Map } from "./Map";

const Body = ({
    apiKey,
    styleURL,
}) => {
    let [markers, setMarkers] = useState([]);

    let onMapClick = event => {
        let { lat, lng } = event;        
        setMarkers((markers) =>  [...markers, {lat, lng}])
    };
  
    return (
        <SimpleGrid columns={2}>
            <GridItem>
                foobar
            </GridItem>
            <GridItem>
                <Map apiKey={apiKey}
                    styleUrl={styleURL} 
                    onClick={onMapClick}
                    points={markers}
                />    
            </GridItem>
        </SimpleGrid>

         );
};

export { Body };
