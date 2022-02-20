import { useState } from 'react';

import { Container, Input, Button, Spacer } from '@chakra-ui/react';

const SearchInput = ({ placeholder, onSubmit }) => {
    const [text, setText] = useState("");
    
    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(text);
        // setText("");
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

const Sidebar = ({ placeholder, onSubmit, onClearMarkers }) => {
    return (
        <Container padding={5}>
            <SearchInput placeholder={placeholder} onSubmit={onSubmit} />
            <Spacer height={"10px"}/>
            <ClearMarkersButton onPress={onClearMarkers}/>
        </Container>);
};

export { Sidebar };