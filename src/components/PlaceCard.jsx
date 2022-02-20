import { Box } from "@chakra-ui/react";

// https://chakra-ui.com/docs/layout/box
const PlaceCard = ({ name }) => {
    return (
        <Box p="6" width="100%" borderWidth="1px" borderRadius="lg" borderColor='#ff473a'>
            {name}
        </Box>
    );
};

export { PlaceCard };
