import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, StatusBar, useTheme } from 'native-base';
import { HeaderBar } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import isEqual from 'react-fast-compare';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import AllNotificationList from './components/AllNotificationList';

const NotificationComponent = () => {
    const { colors, fonts } = useTheme();
    const navigation = useNavigation();
    return (
        <Box safeArea flex={1} color={colors.white}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <HeaderBar title='Thông báo' navigation={navigation} />
            <ScrollableTabView
                tabBarActiveTextColor={colors.blue}
                tabBarInactiveTextColor={colors.dark}
                tabBarTextStyle={{ fontFamily: fonts.hMedium }}
                prerenderingSiblingsNumber={0}
                tabBarUnderlineStyle={{ backgroundColor: colors.blue }}
                renderTabBar={() => <ScrollableTabBar style={styles.tabStyle} />}
            >
                <AllNotificationList tabLabel='Tất cả' navigation={navigation} />
                <AllNotificationList tabLabel='Nội bộ' navigation={navigation} />
                <AllNotificationList tabLabel='Đơn hàng' navigation={navigation} />
                <AllNotificationList tabLabel='Khuyến mại' navigation={navigation} />
                {/* <PrivateNotificationList tabLabel='Nội bộ' navigation={navigation} />
                <OrderNotificationList tabLabel='Đơn hàng' navigation={navigation} />
                <DiscountNotificationList tabLabel='Khuyến mại' navigation={navigation} /> */}
            </ScrollableTabView>
        </Box>
    );
};

export const NotificationScreen = React.memo(NotificationComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);

const styles = StyleSheet.create({
    tabStyle: {
        borderWidth: 0,
    },
});
