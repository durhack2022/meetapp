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

let onMapClick = event => {
  let { lat, lng } = event;
  console.log(`clicked at lat: ${lat} lng: ${lng}`);

  console.log("clicked:", event);
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
