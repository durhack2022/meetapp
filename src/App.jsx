import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { Map } from "./components/Map";

// TODO: store on the backend
const MAP_API_KEY = "AIzaSyCBkw_uhBVIOIqek8TbGZXex8pszTc8Qnk"   // process.env.GOOGLE_MAPS_API_KEY
const MAP_STYLE_URL = "wwwwwww"                                 // process.env.MAP_STYLE_URL;

const base_style = {
  backgroundColor: "white",
  fontFamily: "Arial",
};

function GetCentroid(userCoordinates){

  let sumLat=0;
  let sumLong=0;
  for (let coordinate in userCoordinates){
    sumLat+=coordinate[0];
    sumLong+=coordinate[1];
  }
  let avgLat=sumLat/(userCoordinates.length);
  let avgLong=sumLong/(userCoordinates.length);
  return (avgLat,avgLong);
}

let onMapClick = event => {
  let { lat, lng } = event;
  console.log(`clicked at lat: ${lat} lng: ${lng}`);
};

const App = () => {
  return (
    <ChakraProvider>                      {/* set up chakra UI            */}
        <div style={base_style}>
          <Map apiKey={MAP_API_KEY}
               styleUrl={MAP_STYLE_URL} 
               onClick={onMapClick} 
               />
        </div>
    </ChakraProvider>
  )
};

export default App;
