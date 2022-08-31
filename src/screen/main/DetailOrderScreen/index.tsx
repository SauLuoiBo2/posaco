import { StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Actionsheet, Box, Divider, FlatList, HStack, ScrollView, StatusBar, Text, useTheme } from 'native-base';
import {
    Button,
    Calendar,
    HeaderBar,
    ListEmpty,
    OrderStatusItem,
    PickDate,
    Popup,
    scale,
    vScale,
} from '@src/components';
import { useNavigation } from '@react-navigation/native';
import { STATUS_ORDER, themes } from '@src/utils';
import { color } from 'styled-system';

import OrderInformation from './components/OrderInformation';
import OrderStatus from './components/OrderStatus';
import OrderProducts from './components/OrderProducts';

const DetailOrderComponent = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const PopupRef: any = useRef();

    return (
        <Box safeAreaTop bg={colors.white} flex={1}>
            <StatusBar backgroundColor={colors.blue} barStyle='dark-content' />
            <HeaderBar title='Chi tiết đơn hàng' navigation={navigation} px={`${scale(16)}px`} pb='16px' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bg={colors.light}
                flex={1}
                pt={`${vScale(16)}px`}
                px={`${scale(16)}px`}
            >
                <OrderInformation mb={`${vScale(24)}px`} />
                <OrderStatus mb={`${vScale(24)}px`} />
                <OrderProducts />
            </ScrollView>
            <Box px={`${scale(16)}px`} pb={`${vScale(32)}px`} pt={`${vScale(24)}px`} bg={colors.light}>
                <Button title='Sửa đơn hàng' h='48px' _text={{ fontSize: 16 }} mb='12px' />
                <Button
                    title='Hủy đơn hàng'
                    h='48px'
                    _text={{ fontSize: 16, color: colors.blue }}
                    isOutline
                    onPress={() => PopupRef.current.show()}
                />
            </Box>
            <Popup
                titlePopup='Huỷ đơng hàng'
                description='Đơn hàng CT1980/1019 sẽ bị huỷ.
                Bạn có chắc chắn không?'
                ref={PopupRef}
                typePopup='selection'
                titleButton1='Huỷ đơn hàng'
                titleButton2='Quay lại'
                onPressRight={() => PopupRef.current.hide()}
            />
        </Box>
    );
};

export const DetailOrderScreen = React.memo(DetailOrderComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);

const styles = StyleSheet.create({});
