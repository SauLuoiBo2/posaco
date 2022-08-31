import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreateOrderScreen, HomeScreen, OrderScreen, PersonalScreen, ProductScreen } from '@src/screen';
import { useTheme } from 'native-base';
import { SCREENS } from '@src/navigation/screenTypes';
import { useRoute } from '@react-navigation/native';
import logger from '@src/utils/common/logger';

import TabBarCustom from './CustomTabBar';

type TabScreenOptions = {
    tabBarLabel: string;
    iconActive: string;
    iconDeactive: string;
};

const Tab = createBottomTabNavigator();
const BottomTab = () => {
    const { colors } = useTheme();
    const route = useRoute();
    return (
        <Tab.Navigator
            initialRouteName='HomeTab'
            screenOptions={{
                tabBarStyle: { height: 90, paddingTop: 16 },
                tabBarInactiveTintColor: colors.dark[400],
                tabBarActiveTintColor: colors.primary[700],
                headerShown: false,
            }}
            tabBar={(props) => <TabBarCustom {...props} />}
        >
            <Tab.Screen
                name={SCREENS.HOME_TAB}
                component={HomeScreen}
                options={() => ({
                    tabBarLabel: 'Trang chủ',
                    iconActive: 'home',
                    iconDeactivate: 'home-fill',
                })}
            />
            <Tab.Screen
                name={SCREENS.ORDER_TAB}
                component={OrderScreen}
                options={() => ({
                    tabBarLabel: 'Đơn hàng',
                    iconActive: 'order',
                    iconDeactivate: 'order-fill',
                })}
            />
            <Tab.Screen
                name={SCREENS.CREATE_ORDER_SCREEN}
                component={CreateOrderScreen}
                options={() => ({
                    tabBarLabel: 'Tạo đơn',
                    iconActive: 'home',
                    iconDeactivate: 'home-fill',
                })}
            />
            <Tab.Screen
                name={SCREENS.PRODUCT_TAB}
                component={ProductScreen}
                options={() => ({
                    tabBarLabel: 'Sản phẩm',
                    iconActive: 'shop',
                    iconDeactivate: 'shop-fill',
                })}
            />
            <Tab.Screen
                name={SCREENS.PERSONAL_TAB}
                component={PersonalScreen}
                options={() => ({
                    tabBarLabel: 'Cá nhân',
                    iconActive: 'profile',
                    iconDeactivate: 'profile-fill',
                })}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;

// const styles = StyleSheet.create({
//     bottomBar: {
//         height: 68,
//     },
// });
