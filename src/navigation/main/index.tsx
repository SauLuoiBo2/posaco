import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions } from '@src/utils';
import {
    NotificationDetailScreen,
    NotificationScreen,
    PersonalAboutUsScreen,
    PersonalInfoScreen,
    PersonalInfoEditScreen,
    PersonalSupportScreen,
    ProductCalculateScreen,
    ProductCategoryScreen,
    ProductDetailScreen,
    PersonalMessageScreen,
    PersonalLiabilitiesScreen,
    DetailOrderScreen,
    DetailOrderRatingScreen,
} from '@src/screen';

import { SCREENS } from '../screenTypes';

import BottomTab from './BottomTab';

const Stack = createStackNavigator();
const MainStack = () => (
    <Stack.Navigator initialRouteName={SCREENS.BOTTOM_TAB} screenOptions={screenOptions}>
        <Stack.Screen name={SCREENS.BOTTOM_TAB} component={BottomTab} />

        {/* NOTIFICATION */}
        <Stack.Screen name={SCREENS.NOTIFICATION_SCREEN} component={NotificationScreen} />
        <Stack.Screen name={SCREENS.NOTIFICATION_DETAIL_SCREEN} component={NotificationDetailScreen} />
        {/* PRODUCT */}
        <Stack.Screen name={SCREENS.PRODUCT_DETAIL_SCREEN} component={ProductDetailScreen} />
        <Stack.Screen name={SCREENS.PRODUCT_CATEGORY_SCREEN} component={ProductCategoryScreen} />
        <Stack.Screen name={SCREENS.PRODUCT_CALCULATE_SCREEN} component={ProductCalculateScreen} />
        {/* PERSONAL */}
        <Stack.Screen name={SCREENS.PERSONAL_INFO_SCREEN} component={PersonalInfoScreen} />
        <Stack.Screen name={SCREENS.PERSONAL_INFO_EDIT_SCREEN} component={PersonalInfoEditScreen} />
        <Stack.Screen name={SCREENS.PERSONAL_ABOUT_US_SCREEN} component={PersonalAboutUsScreen} />
        <Stack.Screen name={SCREENS.PERSONAL_SUPPORT_SCREEN} component={PersonalSupportScreen} />
        <Stack.Screen name={SCREENS.PERSONAL_MESSAGE_SCREEN} component={PersonalMessageScreen} />
        <Stack.Screen name={SCREENS.PERSONAL_LIABILITIES_SCREEN} component={PersonalLiabilitiesScreen} />
        {/* ORDER */}
        <Stack.Screen name={SCREENS.ORDER_DETAIL_SCREEN} component={DetailOrderScreen} />
        <Stack.Screen name={SCREENS.ORDER_DETAIL_RATING_SCREEN} component={DetailOrderRatingScreen} />
    </Stack.Navigator>
);

export default MainStack;
