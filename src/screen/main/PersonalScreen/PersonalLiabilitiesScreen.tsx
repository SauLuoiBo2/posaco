import { StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { Actionsheet, Box, FlatList, HStack, Text, useTheme } from 'native-base';
import isEqual from 'react-fast-compare';
import { HeaderBar, scale, PickDate, vScale, ListEmpty, Calendar } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import { menuFilterLiabilities, themes } from '@src/utils';
import numeral from 'numeral';

import LesItemCT from './Components/LesItemCT';
import AdvancedFilter from './Components/AdvancedFilter';

const dataCt = [
    {
        id: 481019,
        date: 1648174378,
        money: 331505000,
        paid: false,
    },
    {
        id: 234423,
        date: 1648174378,
        money: 331505000,
        paid: true,
    },
    {
        id: 442331,
        date: 1648174378,
        money: 331505000,
        paid: true,
    },
    {
        id: 222334,
        date: 1648174378,
        money: 331505000,
        paid: false,
    },
    {
        id: 444223,
        date: 1648174378,
        money: 331505000,
        paid: true,
    },
    {
        id: 123653,
        date: 1648174378,
        money: 331505000,
        paid: false,
    },
];

const ItemLiabilities = ({ name, color, price }: any) => (
    <HStack w='full' mt={`${vScale(10)}px`} justifyContent='space-between'>
        <Text fontSize='12px' fontFamily={themes.fonts.hBold} fontWeight='bold' color={themes.colors.darkNeu}>
            {name.toUpperCase()}
        </Text>
        <Text fontWeight='bold' fontSize='16px' style={{ color }}>
            {numeral(price).format()}đ
        </Text>
    </HStack>
);

const PersonalLiabilitiesComponent = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const BSCalender: any = useRef();
    const BSFilter: any = useRef();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isShowFilterSheet, setIsShowFilterSheet] = useState(false);

    const ListHeaderComponent = () => (
        <Box
            // onLayout={onLayout}
            w='full'
            px={`${scale(16)}px`}
            py={`${scale(16)}px`}
            m={`${vScale(16)}px`}
            bg={colors.white}
            mx='2px'
            style={styles.shadow}
        >
            <ItemLiabilities name='Số dư đầu kỳ' color={colors.blue} price='296849929' />
            <ItemLiabilities name='Số dư cuối kỳ' color={colors.blue} price='295768645' />
            <ItemLiabilities name='tổng phát sinh nợ' color={colors.red} price='68918716' />
            <ItemLiabilities name='tổng phát sinh có' color={colors.green} price='70000000' />
        </Box>
    );

    const renderItem = ({ item, index }: any) => (
        <LesItemCT
            key={index}
            command={item.id}
            date={item.date}
            money={item.money}
            color={item.paid ? colors.green : colors.red}
        />
    );

    const onPressCalendar = () => BSCalender.current.open();

    const onClose = () => {
        setStartDate(BSCalender?.current?.getStartDate());
        setEndDate(BSCalender?.current?.getEndDate());
    };
    return (
        <Box safeAreaTop bg={colors.white} flex={1}>
            <HeaderBar
                title='Công nợ'
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
                    data={dataCt}
                    extraData={dataCt}
                    keyExtractor={(item) => `${item.id}`}
                    ListEmptyComponent={<ListEmpty />}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ListHeaderComponent={ListHeaderComponent}
                    ListFooterComponent={() => <Box mb='32px' />}
                />
            </Box>
            <Calendar ref={BSCalender} onClose={onClose} />
            <Actionsheet isOpen={isShowFilterSheet} onClose={() => setIsShowFilterSheet(false)}>
                <Actionsheet.Content bg={colors.white}>
                    <AdvancedFilter
                        dataFilter={menuFilterLiabilities}
                        ref={BSFilter}
                        setIsShowFilterSheet={setIsShowFilterSheet}
                    />
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    );
};

export const PersonalLiabilitiesScreen = React.memo(PersonalLiabilitiesComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);

const styles = StyleSheet.create({
    // containerSheet: {
    //     borderRadius: 10,
    //     // zIndex: 1,
    // },
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
    pickDate: {
        paddingHorizontal: scale(16),
        paddingRight: scale(32),
    },
    dateBox: {
        paddingLeft: scale(16),
    },
});
