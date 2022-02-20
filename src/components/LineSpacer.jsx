import { Spacer } from '@chakra-ui/react';

const LineSpacer = ({ padding }) => {
    return <Spacer m={padding} style={{
        borderBottomColor: '#A0A0A0',
        borderBottomWidth: 1,
    }}/>;
};

export { LineSpacer };