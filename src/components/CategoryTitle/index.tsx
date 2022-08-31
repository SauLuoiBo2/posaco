import { StyleSheet } from 'react-native';
import { View, Text, HStack, useTheme } from 'native-base';
import React from 'react';

import Touchable from '../Touchable';
import { scale } from '../ScaleSheet';

function CategoryTitle({ name, textMore, onPress, style }: any) {
    const { colors, fonts } = useTheme();
    return (
        <HStack w='full' style={style} justifyContent='space-between'>
            <Text fontWeight='bold' fontSize='18px'>
                {name}
            </Text>
            <Touchable style={styles.more} onPress={onPress}>
                <Text color={colors.blue} fontFamily={fonts.hRegular} fontSize='16px' mt='2px'>
                    {textMore}
                </Text>
            </Touchable>
        </HStack>
    );
}

const styles = StyleSheet.create({
    more: {
        paddingLeft: scale(12),
        height: '100%',
    },
});

export default React.memo(CategoryTitle);
