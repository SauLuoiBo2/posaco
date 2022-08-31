import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Box, HStack, Text, useTheme, View, VStack } from 'native-base';
import React from 'react';
import numeral from 'numeral';
import { SCREENS } from '@src/navigation';

import Touchable from '../Touchable';
import { Button, Image } from '..';
import { scale, vScale } from '../ScaleSheet';

type Props = {
    product: any;
    navigation: any;
    style?: StyleProp<TextStyle>;
};

function ProductItem({ product, navigation, style }: Props) {
    const { colors, fonts } = useTheme();
    const onPress = () => navigation.navigate(SCREENS.PRODUCT_DETAIL_SCREEN, { id: product.id });

    return (
        <Touchable style={[styles.containerProduct, style]} onPress={onPress}>
            <>
                <Image source={{ uri: product?.image || '' }} style={styles.imageProduct} placeholder />
                <Box pl={4} flex={1} justifyContent='space-between'>
                    <Text
                        color={colors.dark}
                        fontFamily={fonts.hBold}
                        fontWeight='bold'
                        fontSize='16px'
                        noOfLines={2}
                        textTransform='uppercase'
                    >
                        {product?.name || ''}
                    </Text>
                    <HStack fontFamily={fonts.hMedium} fontSize='16px'>
                        <Text fontSize='16px' color={colors.darkNeu}>
                            Chỉ từ:
                        </Text>
                        <Text ml='2px' fontSize='16px' color={colors.red} fontWeight='bold' fontFamily={fonts.hBold}>
                            {numeral(product?.price || 0).format()}₫
                        </Text>
                        <Text ml='2px' fontSize='16px' color={colors.darkNeu}>
                            / 1 tấm
                        </Text>
                    </HStack>
                    <Button
                        isRound
                        title='ĐẶT MUA'
                        style={styles.buttonOrdered}
                        _text={{
                            color: colors.white,
                            fontSize: '12px',
                            fontWeight: 'bold',
                            fontFamily: 'hBold',
                        }}
                        onPress={onPress}
                        w={`${scale(84)}`}
                        h={`${vScale(32)}`}
                        alignSelf='flex-end'
                    />
                </Box>
            </>
        </Touchable>
    );
}

export default ProductItem;

const styles = StyleSheet.create({
    containerProduct: {
        marginBottom: scale(14),
        flexDirection: 'row',
        marginVertical: vScale(6),
        flex: 1,
        borderRadius: 8,
    },
    imageProduct: {
        width: scale(104),
        height: vScale(130),
        borderRadius: 3,
        // flex: 1,
    },
    buttonOrdered: {
        height: vScale(32),
    },
});
