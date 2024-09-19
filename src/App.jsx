import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { Body } from "./components/Body";

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const MAP_STYLE_URL = process.env.REACT_APP_MAP_STYLE_URL;          
const base_style = {
  backgroundColor: "white",
  fontFamily: "Arial",
};

const App = () => {
  console.log("asdadadsasdada");
  console.log(MAP_API_KEY);
  return (
    <ChakraProvider>
        <div style={base_style}>
          <Body apiKey={MAP_API_KEY} styleUrl={MAP_STYLE_URL} />
        </div>
    </ChakraProvider>
  )
};

export default App;
