import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, HStack, Text, useTheme, VStack } from 'native-base';
import { scale, vScale } from '@src/components';
import numeral from 'numeral';
import moment from 'moment';

const LesItemCT = ({ command, date, money, color, style }: any) => {
    const { colors, fonts } = useTheme();
    return (
        <Box bg={colors.white} mb={`${vScale(8)}px`} px={`${scale(16)}px`} py={`${vScale(16)}px`}>
            <HStack justifyContent='flex-start' borderBottomWidth={1} borderColor={colors.lightGrey} pb='8px'>
                <Text w='30%' fontFamily={fonts.hBold} fontWeight='bold' color={colors.darkNeu} fontSize='12px'>
                    {'Lệnh CT'.toUpperCase()}
                </Text>
                <Text
                    w='30%'
                    textAlign='center'
                    fontFamily={fonts.hBold}
                    fontWeight='bold'
                    color={colors.darkNeu}
                    fontSize='12px'
                >
                    {'Ngày CT'.toUpperCase()}
                </Text>
                <Text
                    w='40%'
                    textAlign='right'
                    pr={`${scale(16)}px`}
                    fontFamily={fonts.hBold}
                    fontWeight='bold'
                    color={colors.darkNeu}
                    fontSize='12px'
                >
                    {'Tiền GD'.toUpperCase()}
                </Text>
            </HStack>
            <HStack pt={`${vScale(6)}px`}>
                <Text w='30%' color={colors.dark} fontSize='16px'>
                    {command}
                </Text>
                <Text w='30%' textAlign='center' color={colors.dark} fontSize='16px'>
                    {moment(date * 1000 || '').format('DD/MM/YYYY')}
                </Text>
                <Text w='40%' textAlign='right' fontSize='16px' color={color}>
                    {numeral(money).format()}
                </Text>
            </HStack>
        </Box>
    );
};

export default React.memo(LesItemCT);

const styles = StyleSheet.create({});
