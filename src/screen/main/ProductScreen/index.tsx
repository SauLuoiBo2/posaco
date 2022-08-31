import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Box, Text, useTheme } from 'native-base';
import { HeaderBar, scale, SearchBar, vScale } from '@src/components';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { themes } from '@src/utils';
import { useNavigation } from '@react-navigation/native';

import ProductList from './components/ProductList';

const ProductComponent = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <Box safeAreaTop flex={1} bg={colors.white} pb={0}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <Text pl={`${scale(16)}px`} color={colors.dark} fontSize='20px' mt='12px' mb='8px' fontWeight='bold'>
                Sản phẩm
            </Text>
            <Box px='16px'>
                <SearchBar placeholder='Tìm kiếm sản phẩm' />
            </Box>
            <ScrollableTabView
                style={styles.tabsContainer}
                tabBarTextStyle={styles.tabBarTextStyle}
                tabBarInactiveTextColor={colors.darkNeu}
                tabBarActiveTextColor={colors.blue}
                tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                renderTabBar={() => <ScrollableTabBar />}
            >
                <ProductList tabLabel='Tất cả' navigation={navigation} />
                <ProductList tabLabel='Tôn' navigation={navigation} />
                <ProductList tabLabel='Tôn trần' navigation={navigation} />
                <ProductList tabLabel='Xà gồ' navigation={navigation} />
                <ProductList tabLabel='Phụ kiện' navigation={navigation} />
            </ScrollableTabView>
        </Box>
    );
};

export const ProductScreen = React.memo(ProductComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));

const styles = StyleSheet.create({
    // headercontainer: {
    //     borderBottomWidth: 0,
    // },
    tabsContainer: {
        paddingVertical: vScale(6),
        borderBottomWidth: vScale(1),
        borderBottomColor: themes.colors.light,
    },
    tabBarTextStyle: {
        fontSize: 16,
        fontFamily: themes.fonts.hBold,
        paddingBottom: vScale(7),
    },
    tabBarUnderlineStyle: {
        backgroundColor: themes.colors.blue,
        height: vScale(3),
    },
});
