import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, Divider, HStack, IBoxProps, Text, useTheme } from 'native-base';
import { scale, Touchable, vScale } from '@src/components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import logger from '@src/utils/common/logger';

const OrderInformation = (props: IBoxProps) => {
    const { colors, fonts } = useTheme();
    return (
        <Box {...props}>
            <Text fontWeight='bold' fontSize={18} mb='12px'>
                Thông tin đặt hàng
            </Text>
            <Box bg={colors.white} py={`${vScale(16)}px`} px={`${scale(16)}px`}>
                <Text fontSize={12} color={colors.darkNeu} fontWeight='bold'>
                    Người nhận
                </Text>
                <Text fontSize={16} color={colors.dark} fontWeight='bold'>
                    NGUYỄN VĂN KHÁNH
                </Text>
                <Divider my='1' bg={colors.lightGrey} mb='12px' mt='8px' />
                <HStack mb='4px'>
                    <Text fontSize={16} color={colors.darkNeu}>
                        Số điện thoại:
                    </Text>
                    <Text ml='4px' fontSize={16} color={colors.dark}>
                        0989533823
                    </Text>
                </HStack>
                <HStack>
                    <Text fontSize={16} color={colors.darkNeu}>
                        Địa chỉ:
                    </Text>
                    <Text ml='4px' fontSize={16} color={colors.dark}>
                        Hoả Lò, Phúc Diễn, Từ Liêm, Hà Nội
                    </Text>
                </HStack>
                <Divider my='1' bg={colors.lightGrey} mb='12px' mt='8px' />
                <HStack mb='4px'>
                    <Text fontSize={16} color={colors.darkNeu}>
                        Mã đơn hàng:
                    </Text>
                    <Text ml='4px' fontSize={16} color={colors.dark} fontWeight='bold'>
                        CT1980/1019
                    </Text>
                </HStack>
                <HStack mb='4px'>
                    <Text fontSize={16} color={colors.darkNeu}>
                        Ngày đặt hàng:
                    </Text>
                    <Text ml='4px' fontSize={16} color={colors.dark}>
                        08:45 27/10/2019
                    </Text>
                </HStack>
                <HStack mb='4px'>
                    <Text fontSize={16} color={colors.darkNeu}>
                        NVKD:
                    </Text>
                    <Text ml='4px' fontSize={16} color={colors.dark}>
                        Bùi Huy Toàn
                    </Text>
                </HStack>
                <HStack mb='4px'>
                    <Text fontSize={16} color={colors.darkNeu}>
                        Ghi chú:
                    </Text>
                    <Text ml='4px' fontSize={16} color={colors.dark}>
                        Giao hàng từ 3h - 5h chiều
                    </Text>
                </HStack>
                <Divider my='1' bg={colors.lightGrey} mb='12px' mt='8px' />
                <Touchable onPress={() => logger.debug('onpress', null)}>
                    <HStack justifyContent='space-between' alignItems='center'>
                        <Text color={colors.blue} fontSize={16} fontWeight='bold'>
                            Đại lý cường vui
                        </Text>
                        <Icon name='chevron-right' color={colors.blue} size={15} />
                    </HStack>
                </Touchable>
            </Box>
        </Box>
    );
};

export default React.memo(OrderInformation);
