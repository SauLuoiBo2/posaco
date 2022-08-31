import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, HStack, IBoxProps, Image, Text, useTheme, VStack } from 'native-base';
import { scale, vScale } from '@src/components';
import { renderImage, STATUS_ORDER } from '@src/utils';

const OrderStatus = (props: IBoxProps) => {
    const { colors, fonts } = useTheme();
    return (
        <Box {...props}>
            <Text fontWeight='bold' fontSize={18} mb='12px'>
                Trạng thái đơn hàng
            </Text>
            <HStack bg={colors.white} px={`${scale(16)}px`} justifyContent='space-between' alignItems='center'>
                <VStack pt='4px'>
                    <Text textTransform='uppercase' fontWeight='bold' fontSize={12} color={colors.darkNeu}>
                        Trạng thái
                    </Text>
                    <Text fontWeight='bold' fontSize={20} mb='4px' color={colors.orange}>
                        Chờ xác nhận
                    </Text>
                </VStack>
                <Image source={renderImage(STATUS_ORDER.PENDING)} style={styles.imgStatus} />
            </HStack>
        </Box>
    );
};

export default React.memo(OrderStatus);

const styles = StyleSheet.create({
    imgStatus: {
        width: scale(80),
        height: scale(80),
    },
});
