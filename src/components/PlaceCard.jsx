import { Box } from "@chakra-ui/react";

const style = {
    textAlign: "left",
};

// https://chakra-ui.com/docs/layout/box
const PlaceCard = ({ name }) => {
    return (
        <Box mt='1' borderWidth="1px" borderRadius="lg" borderColor='#ff473a'
            width="100%"
            p="3.5"
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
        >{name}</Box>
//{property.title}
    );
};

export { PlaceCard };
