import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';
import { View, Text, useTheme, Box, HStack, VStack } from 'native-base';
import numeral from 'numeral';
import moment from 'moment';
import { renderNameStatus, renderColorStatus, renderImage, themes } from '@src/utils';
import logger from '@src/utils/common/logger';

import Touchable from '../Touchable';
import { scale, vScale } from '../ScaleSheet';
import Image from '../ImageCommon';

const ORDER_STATUS = {
    id: 'CT1908/1019',
    status: 'DELIVERED',
    createAt: new Date(),
    price: '23000000',
    rate: 3.4,
};

function OrderStatusItem({ onPressOrder, orderStatus = ORDER_STATUS, style, onPressRate }: any) {
    const { colors, fonts } = useTheme();
    const onPress = () => {
        onPressOrder(orderStatus);
    };
    // logger.debug('orderStatus', orderStatus);
    return (
        <Touchable onPress={onPress} style={[style, styles.content]}>
            <Box>
                <HStack style={styles.status} justifyContent='space-between'>
                    <Text fontFamily={fonts.hMedium} fontWeight='medium'>
                        {orderStatus?.id || ' '}
                    </Text>
                    <Text
                        fontFamily={fonts.hMedium}
                        fontWeight='medium'
                        style={{ color: renderColorStatus(orderStatus.status) }}
                    >
                        {renderNameStatus(orderStatus?.status || 'DELIVERED')}
                    </Text>
                </HStack>
                <HStack py={`${vScale(3)}px`} justifyContent='space-between'>
                    <VStack pt='12px'>
                        <Text fontFamily={fonts.hMedium} fontWeight='medium' fontSize='14px' numberOfLines={2}>
                            Đơn giá
                        </Text>
                        <Text color={colors.darkNeu} fontWeight={500} fontFamily={fonts.hMedium} my={`${vScale(3)}px`}>
                            {moment(orderStatus?.createAt || '').format('HH:MM DD/MM/YYYY')}
                        </Text>
                        <Text color={colors.red} fontSize='18px' fontWeight='bold' fontFamily={fonts.hBold}>
                            {numeral(orderStatus?.price || 0).format()}₫
                        </Text>
                    </VStack>
                    <Image source={renderImage(orderStatus.status)} style={styles.imgStatus} />
                </HStack>
                {orderStatus.status === 'DELIVERED' ? (
                    <HStack
                        justifyContent='space-between'
                        py={`${vScale(10)}px`}
                        borderColor={colors.white1}
                        borderTopWidth={1}
                    >
                        <Text fontFamily={fonts.hMedium} fontWeight='medium'>
                            Chất lượng dịch vụ
                        </Text>
                        {orderStatus.rate && orderStatus.status === 'DELIVERED' ? (
                            <StarRating
                                maxStars={5}
                                disabled
                                fullStar='star'
                                emptyStar='star'
                                starSize={scale(18)}
                                rating={orderStatus.rate}
                                fullStarColor={colors.star}
                                starStyle={styles.starRating}
                                emptyStarColor={colors.lightGrey}
                            />
                        ) : (
                            <Touchable onPress={onPressRate} style={{ paddingLeft: scale(12) }}>
                                <Text fontSize='14px' color={colors.blueMalibu} fontFamily={fonts.hMedium}>
                                    Đánh giá ngay
                                </Text>
                            </Touchable>
                        )}
                    </HStack>
                ) : null}
            </Box>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: scale(12),
        overflow: 'hidden',
        // paddingTop: vScale(12),
        marginTop: vScale(12),
        // backgroundColor: themes.colors.white,
    },
    status: {
        paddingBottom: vScale(10),
        borderColor: themes.colors.white1,
        borderBottomWidth: 1,
    },
    imgStatus: {
        width: scale(90),
        height: scale(90),
    },
    starRating: {
        paddingLeft: 3,
    },
});

export default OrderStatusItem;
