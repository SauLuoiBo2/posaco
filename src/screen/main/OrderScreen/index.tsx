import { StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Actionsheet, Box, FlatList, StatusBar, Text, useTheme } from 'native-base';
import { Calendar, HeaderBar, ListEmpty, OrderStatusItem, PickDate, scale, vScale } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import { menuFilterOrder, STATUS_ORDER, themes } from '@src/utils';
import { SCREENS } from '@src/navigation';
import logger from '@src/utils/common/logger';

import AdvancedFilter from '../PersonalScreen/Components/AdvancedFilter';

const dataOrders = [
    {
        id: 'CT1908/1019',
        status: STATUS_ORDER.DELIVERED,
        createAt: new Date(),
        price: 23000000,
    },
    {
        id: 'CT1930/1019',
        status: STATUS_ORDER.DELIVERED,
        createAt: new Date(),
        price: 23000000,
    },
    {
        id: 'CT1910/1019',
        status: STATUS_ORDER.TRANSPORTING,
        createAt: new Date(),
        price: 23000000,
    },
    {
        id: 'CT1903/1019',
        status: STATUS_ORDER.TRANSPORTING,
        createAt: new Date(),
        price: 23000000,
    },
    {
        id: 'CT1902/1019',
        status: STATUS_ORDER.CONFIRMED,
        createAt: new Date(),
        price: 23000000,
    },
];

const OrderComponent = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const BSCalender: any = useRef();
    const BSFilter: any = useRef();

    const [isShowFilterSheet, setIsShowFilterSheet] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onPressCalendar = () => BSCalender.current.open();

    const onClose = () => {
        setStartDate(BSCalender?.current?.getStartDate());
        setEndDate(BSCalender?.current?.getEndDate());
    };

    const handleOnPressOrder = () => navigation.navigate(SCREENS.ORDER_DETAIL_SCREEN);

    const handleOnPressRate = () => navigation.navigate(SCREENS.ORDER_DETAIL_RATING_SCREEN);

    const renderItem = ({ item, index }: any) => (
        <OrderStatusItem
            orderStatus={item}
            key={index}
            style={styles.order}
            onPressOrder={handleOnPressOrder}
            onPressRate={handleOnPressRate}
        />
    );

    return (
        <Box safeAreaTop bg={colors.white} flex={1}>
            <StatusBar backgroundColor={colors.blue} barStyle='dark-content' />
            <HeaderBar
                titleLeft='Đơn hàng'
                nameIconRight='filter'
                navigation={navigation}
                px={`${scale(16)}px`}
                onPressRight={() => setIsShowFilterSheet(true)}
            />
            <PickDate
                onPress={onPressCalendar}
                styleBtnDate={styles.pickDate}
                styleDate={styles.dateBox}
                startDate={startDate}
                endDate={endDate}
            />
            <Box bg={colors.light} px={`${scale(16)}px`} flex={1}>
                <FlatList
                    pt={`${vScale(16)}px`}
                    data={dataOrders}
                    extraData={dataOrders}
                    keyExtractor={(item) => `${item.id}`}
                    ListEmptyComponent={<ListEmpty />}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    // ListHeaderComponent={ListHeaderComponent}
                    ListFooterComponent={() => <Box mb='32px' />}
                />
            </Box>
            <Calendar ref={BSCalender} onClose={onClose} />
            <Actionsheet isOpen={isShowFilterSheet} onClose={() => setIsShowFilterSheet(false)}>
                <Actionsheet.Content bg={colors.white}>
                    <AdvancedFilter
                        ref={BSFilter}
                        setIsShowFilterSheet={setIsShowFilterSheet}
                        dataFilter={menuFilterOrder}
                    />
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    );
};

export const OrderScreen = React.memo(OrderComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));

const styles = StyleSheet.create({
    // shadow: {
    //     shadowColor: themes.colors.black,
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.08,
    //     shadowRadius: 10,
    //     elevation: 10,
    // },
    order: {
        marginBottom: vScale(16),
        paddingTop: vScale(12),
        backgroundColor: themes.colors.white,
    },
    pickDate: {
        paddingHorizontal: scale(16),
        paddingRight: scale(32),
    },
    dateBox: {
        paddingLeft: scale(16),
    },
});
