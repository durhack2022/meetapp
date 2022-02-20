import { useState } from 'react';

import { Container, Input, Button, Spacer, VStack } from '@chakra-ui/react';

import { PlaceCard } from "./PlaceCard";
import { LineSpacer } from './LineSpacer';

const SearchInput = ({ placeholder, onSubmit }) => {
    const [text, setText] = useState("");
    
    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(text);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input placeholder={placeholder} onInput={e => setText(e.currentTarget.value)}/>
        </form>

    );
};

const ClearMarkersButton = ({ onPress }) => {
    return (
        <Button onClick={onPress} bg = '#ff473a' color='white'>Clear Map</Button>
    );
};

const ResultList = ({ items }) => {
    console.log("items", items);
    return (
        <div overflow="scroll">
            <VStack>
                {items.map((item, i) => {
                    return <PlaceCard key={i}
                                name={item["name"]}
                                rating={item["rating"]}
                                url={item["page_url"]}
                                rank={i}
                            />
                })}
            </VStack>
        </div>
    );
};

const Sidebar = ({ placeholder, placeResults, onSubmit, onClearMarkers }) => {
    return (
        <Container padding={5}>
            <SearchInput placeholder={placeholder} onSubmit={onSubmit} />
            <Spacer height={"10px"}/>
            <ClearMarkersButton onPress={onClearMarkers} 
                style={{
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                }}/>
            <LineSpacer padding={"20px"}/>
            <ResultList items={placeResults}/>
        </Container>);
};

export { Sidebar };
