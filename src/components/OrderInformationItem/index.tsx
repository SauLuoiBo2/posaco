import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, HStack, Text, useTheme } from 'native-base';
import numeral from 'numeral';

import { scale, vScale } from '../ScaleSheet';

const mockDataDetail = {
    title: 'Tôn Poshacho',
    price: 30000,
    dimension: '1',
    materials: [
        {
            size: 53.306,
            sheet: 99,
            dimension: 1,
        },
        {
            size: 39.009,
            sheet: 22,
            dimension: 1,
        },
        {
            size: 53.306,
            sheet: 20,
            dimension: 1,
        },
        {
            size: 88.022,
            sheet: 77,
            dimension: 1,
        },
    ],
};

const OrderInformationItem = ({ data = mockDataDetail, ...rest }: any) => {
    const { colors, fonts } = useTheme();
    const { title, price, dimension, materials } = data;
    return (
        <Box bg={colors.white} px={`${scale(16)}px`} py={`${vScale(16)}px`} flex={1} {...rest}>
            <HStack justifyContent='space-between'>
                <Text fontWeight='bold' fontSize={16} w='70%'>
                    {title}
                </Text>
                <Text fontSize={16}>{numeral(price || 0).format()}đ</Text>
            </HStack>
            <HStack
                alignItems='baseline'
                justifyContent='space-between'
                borderBottomWidth={1}
                borderColor={colors.lightGrey}
                pb='8px'
            >
                <Text color={colors.darkNeu} fontSize={12}>
                    Khổ
                </Text>
                <Text fontSize={16} color={colors.dark}>
                    {dimension} cm
                </Text>
            </HStack>
            <HStack pt='8px' justifyContent='space-between'>
                <Text textTransform='uppercase' color={colors.darkNeu} fontWeight='bold' fontSize={12} w='25%'>
                    Kích thước
                </Text>
                <Text
                    textTransform='uppercase'
                    color={colors.darkNeu}
                    fontWeight='bold'
                    fontSize={12}
                    w='20%'
                    textAlign='center'
                >
                    Tấm
                </Text>
                <Text
                    textTransform='uppercase'
                    color={colors.darkNeu}
                    fontWeight='bold'
                    fontSize={12}
                    w='20%'
                    textAlign='center'
                >
                    Khổ
                </Text>
                <Text
                    textTransform='uppercase'
                    color={colors.darkNeu}
                    fontWeight='bold'
                    fontSize={12}
                    w='35%'
                    textAlign='right'
                >
                    Số lượng
                </Text>
            </HStack>

            {materials &&
                materials.length > 0 &&
                materials.map(({ size, sheet, dimension: dms }: any, index: number) => {
                    const amount = (Number(size) * Number(sheet) * Number(dms)).toFixed(2);
                    const amountPrice = Number(amount) * Number(price);
                    return (
                        <HStack
                            pt='8px'
                            pb='8px'
                            justifyContent='space-between'
                            borderBottomWidth={index < materials.length - 1 ? 1 : 0}
                            borderColor={colors.btnHeader}
                        >
                            <Text
                                textTransform='uppercase'
                                color={colors.dark}
                                fontWeight='medium'
                                fontSize={12}
                                w='25%'
                            >
                                {size ?? `null`}
                            </Text>
                            <Text
                                textTransform='uppercase'
                                color={colors.dark}
                                fontWeight='medium'
                                fontSize={12}
                                w='20%'
                                textAlign='center'
                            >
                                {sheet ?? `null`}
                            </Text>
                            <Text
                                textTransform='uppercase'
                                color={colors.dark}
                                fontWeight='medium'
                                fontSize={12}
                                w='20%'
                                textAlign='center'
                            >
                                {`${dms}` ?? `null`}
                            </Text>
                            <Box fontSize={12} w='35%'>
                                <HStack justifyContent='space-between'>
                                    <Text
                                        fontSize={12}
                                        textAlign='right'
                                        color={colors.textHolderInput}
                                        fontWeight='medium'
                                    >
                                        =
                                    </Text>
                                    <Text fontSize={16} textAlign='right' color={colors.dark} fontWeight='medium'>
                                        {amount}
                                    </Text>
                                </HStack>
                                <Text fontSize={16} fontWeight='bold' textAlign='right' color={colors.red}>
                                    {numeral(amountPrice).format()}đ
                                </Text>
                            </Box>
                        </HStack>
                    );
                })}
        </Box>
    );
};

export default React.memo(OrderInformationItem);

const styles = StyleSheet.create({});
