import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, HStack, Text, useTheme } from 'native-base';

const ListItem = ({ label, value, ...props }: any) => {
    const { colors, fonts } = useTheme();
    return (
        <HStack {...props} justifyContent='space-between' mb='12px'>
            <Text fontSize='16px' color={colors.darkNeu} fontFamily={fonts.hMedium}>
                {' '}
                {`${label}  `}
            </Text>
            <Text color={colors.dark} fontSize='16px' fontWeight='bold' fontFamily={fonts.hBold}>
                {' '}
                {value}
            </Text>
        </HStack>
    );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({});
