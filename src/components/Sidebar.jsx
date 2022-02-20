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
        <Button onClick={onPress}>clear markers</Button>
    );
};

const ResultList = ({ results }) => {
    return (
        <div overflow="scroll">
            <VStack>
                {[...Array(5).keys()].map(i => {
                    return <PlaceCard key={i} />
                })}
            </VStack>
        </div>
    );
};

const Sidebar = ({ placeholder, results=[], onSubmit, onClearMarkers }) => {
    return (
        <Container padding={5}>
            <SearchInput placeholder={placeholder} onSubmit={onSubmit} />
            <Spacer height={"10px"}/>
            <ClearMarkersButton onPress={onClearMarkers}/>
            <LineSpacer padding={"20px"}/>
            <ResultList />
        </Container>);
};

export { Sidebar };