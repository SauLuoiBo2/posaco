import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions } from '@src/utils';
import { LoginScreen } from '@src/screen';

import { SCREENS } from '../screenTypes';

const Stack = createStackNavigator();
const AuthStack = () => (
    <Stack.Navigator initialRouteName={SCREENS.LOGIN_SCREEN} screenOptions={screenOptions}>
        <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
);

export default AuthStack;
