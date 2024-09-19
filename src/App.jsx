import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { Body } from "./components/Body";

const MAP_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const MAP_STYLE_URL = "whatever";          
const base_style = {
  backgroundColor: "white",
  fontFamily: "Arial",
};

const App = () => {
  return (
    <ChakraProvider>
        <div style={base_style}>
          <Body apiKey={MAP_API_KEY} styleUrl={MAP_STYLE_URL} />
        </div>
    </ChakraProvider>
  )
};

export default App;
