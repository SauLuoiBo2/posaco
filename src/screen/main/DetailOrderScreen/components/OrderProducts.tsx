import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, FlatList, HStack, IBoxProps, Text, useTheme } from 'native-base';
import { ListEmpty, OrderInformationItem, vScale } from '@src/components';
import numeral from 'numeral';

const dataDetailOrder = [
    {
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
    },
    {
        title: 'Tôn SCCSS',
        price: 30000,
        dimension: '1',
        materials: [
            {
                size: 53.306,
                sheet: 19,
                dimension: 1.02,
            },
        ],
    },
];

const OrderProducts = (props: IBoxProps) => {
    const { colors, fonts } = useTheme();
    return (
        <Box {...props}>
            <Text fontWeight='bold' fontSize={18} mb='12px'>
                Mặt hàng (6)
            </Text>
            {dataDetailOrder.length > 0 &&
                dataDetailOrder.map((data, index) => (
                    <OrderInformationItem key={index} data={data} mb={`${vScale(24)}px`} />
                ))}
            <Box pb={`${vScale(24)}px`}>
                <HStack justifyContent='space-between' mb='8px'>
                    <Text color={colors.darkNeu} fontSize={16} fontWeight='medium'>
                        Tạm tính
                    </Text>
                    <Text fontSize={16} fontWeight='bold'>
                        {numeral(17185906).format()}đ
                    </Text>
                </HStack>
                <HStack justifyContent='space-between' mb='8px'>
                    <Text color={colors.darkNeu} fontSize={16} fontWeight='medium'>
                        Phí vận chuyển
                    </Text>
                    <Text fontSize={16} fontWeight='bold'>
                        {numeral(0).format()}đ
                    </Text>
                </HStack>
                <HStack justifyContent='space-between' mb='8px'>
                    <Text color={colors.darkNeu} fontSize={16} fontWeight='medium'>
                        Tiền thuế
                    </Text>
                    <Text fontSize={16} fontWeight='bold'>
                        {numeral(0).format()}đ
                    </Text>
                </HStack>
                <HStack justifyContent='space-between' mb='8px'>
                    <Text color={colors.darkNeu} fontSize={16} fontWeight='medium'>
                        Tổng giá:
                    </Text>
                    <Text fontSize={20} fontWeight='bold' color={colors.red}>
                        {numeral(17185906).format()}đ
                    </Text>
                </HStack>
                <Text fontSize={16} color={colors.dark} textAlign='right'>
                    Chưa thanh toán
                </Text>
            </Box>
        </Box>
    );
};

export default React.memo(OrderProducts);

const styles = StyleSheet.create({});
