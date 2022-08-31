import { StyleSheet } from 'react-native';
import { View, Text, useTheme, Box, HStack, VStack } from 'native-base';
import React from 'react';
import isEqual from 'react-fast-compare';
import { themes } from '@src/utils';
import numeral from 'numeral';
import { CategoryTitle, scale, vScale } from '@src/components';

const ItemLiabilities = ({ name, color, price, style }: any) => (
    <HStack w='full' style={styles.item} justifyContent='space-between'>
        <Text fontSize='14px' fontFamily={themes.fonts.hBold} fontWeight='bold' color={themes.colors.darkNeu}>
            {name.toUpperCase()}
        </Text>
        <Text fontWeight='bold' fontSize='16px' style={{ color }}>
            {numeral(price).format()}đ
        </Text>
    </HStack>
);

const ItemLiabilitiesComponent = ({ onPress, onLayout }: any) => {
    const { colors } = useTheme();
    return (
        <Box
            onLayout={onLayout}
            w='full'
            px={`${scale(16)}px`}
            py={`${scale(16)}px`}
            bg={colors.white}
            mx='2px'
            style={styles.shadow}
        >
            <CategoryTitle style={styles.title} name='Công nợ trong tháng' textMore='Chi tiết' onPress={onPress} />
            <ItemLiabilities name='Dư nợ cuối' color={colors.red} price='295768645' />
            <ItemLiabilities name='Hạn mức' color={colors.green} price='300000000' />
            <ItemLiabilities name='Vượt Hạn mức' color={colors.orange} price='0' />
        </Box>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingBottom: vScale(8),
        borderColor: themes.colors.white1,
        borderBottomWidth: 1,
    },
    item: {
        marginTop: vScale(10),
    },
    shadow: {
        shadowColor: themes.colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 10,
    },
});

export const Liabilities = React.memo(ItemLiabilitiesComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);
