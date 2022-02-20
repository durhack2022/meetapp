import { useState } from 'react';

import { Box, Container, Input, Button, Spacer, VStack, Switch, FormLabel, FormControl, Flex } from '@chakra-ui/react';

import { PlaceCard } from "./PlaceCard";
import { LineSpacer } from './LineSpacer';

const LOGO_IMG = require("../assets/logo.png");

const LogoInset = ({ height }) => {
    return (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img src={LOGO_IMG} alt={"logo image"} style={{ height: height }}/>
    );
};

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

const LargePersonToggle = ({ onToggle }) => {
    return (
        <FormControl display="flex" alignItems="center">
            <FormLabel html-for="large-person">
                Toggle large person
            </FormLabel>
            <Switch id="large-person" onChange={onToggle}/>
        </FormControl>
    );
};

const SpinPersonToggle = ({ onToggleSpin }) => {
    return (
        <FormControl display="flex" alignItems="center">
            <FormLabel html-for="spin-person">
                Toggle SMM (WARNING)
            </FormLabel>
            <Switch id="spin-person" onChange={onToggleSpin}/>
        </FormControl>
    );
};

const ResultList = ({ items }) => {
    return (
        <div overflow="scroll">
            <VStack>
                {items.map((item, i) => {
                    return <PlaceCard key={i}
                                name={item["name"]}
                                rating={item["rating"]}
                                numRatings={item["user_ratings_total"]}
                                url={item["page_url"]}
                                rank={i}
                            />
                })}
            </VStack>
        </div>
    );
};

const Sidebar = ({ placeholder, placeResults, onSubmit, onClearMarkers, onToggle, onToggleSpin }) => {
    return (
        <Container padding={5}>
            <SearchInput placeholder={placeholder} onSubmit={onSubmit} />
            <Spacer height={"10px"}/>
            <Flex>
                <Box>
                    <ClearMarkersButton onPress={onClearMarkers} />
                </Box>
                <Spacer />
                <Box marginTop={"1vh"}>
                    <>
                        <LargePersonToggle onToggle={onToggle} />
                        <SpinPersonToggle onToggleSpin={onToggleSpin} />
                    </>
                </Box>
            </Flex>
            <LineSpacer padding={"20px"}/>
            <ResultList items={placeResults}/>
            <Box style={{marginLeft: "10vh", marginBottom: "2vh", position: "fixed", bottom: 0}}>
                <LogoInset height={"20vh"}/>
            </Box>
        </Container>);
};

export { Sidebar };
