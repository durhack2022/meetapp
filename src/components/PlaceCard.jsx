import { Text, Box, VStack } from "@chakra-ui/react";

const Name = ({ name }) => {
    return (
        <Box mt='1' 
            lineHeight='tight'
            maxWidth={"100%"}
            px={"5"}
        >
            <Text isTruncated color="grey.500" fontWeight={"bold"}>{name}</Text>
        </Box>
    );
};

const Rating = ({ score }) => {
    return (
        <Box>
            <Text as={"i"}>{score + "⭐"|| "no ratings"}</Text>
        </Box>
    );
};

// https://chakra-ui.com/docs/layout/box
const PlaceCard = ({ name, rating, url, rank }) => {
    let borderColor;

    switch (rank) {
        case 0:
            borderColor = "red";
            break;
        case 1:
            borderColor = "#FFC107";
            break;
        default:
            borderColor = "#5300EB";
    }

    return (
        <Box borderWidth="1.5px"
            borderRadius="lg"
            borderColor={borderColor}
            p="0"
            width="100%"
            onClick={() => {
                window.open(url);
            }}
        >
            <VStack>
                <Name name={name} />
                <Rating score={rating}/>
            </VStack>
        </Box>
    );
};

export { PlaceCard };
