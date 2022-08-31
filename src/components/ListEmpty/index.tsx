import React from 'react';
import { View, Text, Center, useTheme } from 'native-base';

function ListEmpty() {
    const { colors } = useTheme();
    return (
        <Center>
            <Text fontSize='14px' color={colors.black}>
                No Data
            </Text>
        </Center>
    );
}

export default React.memo(ListEmpty);
