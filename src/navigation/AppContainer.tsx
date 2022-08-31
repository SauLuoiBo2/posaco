import React, { useEffect, useLayoutEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'native-base';
import { screenOptions } from '@src/utils';
import { ACCESS_TOKEN, IS_LOGIN, queryClient, useAuth, useGlobalState } from '@src/queries';
import logger from '@src/utils/common/logger';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SCREENS } from './screenTypes';
import AuthStack from './auth';
import MainStack from './main';

const Root = createStackNavigator();

const AppContainer = () => {
    // const [isLogin, setIsLogin] = useGlobalState<boolean>(IS_LOGIN);
    // const [isLogin, setIslogin] = useState(false);

    const { getAuth } = useAuth();
    const { data } = getAuth();

    useLayoutEffect(() => {
        // const getToken = async () => {
        //     // const token = await AsyncStorage.getItem(ACCESS_TOKEN);
        //     // if (token) {
        //     //     setIsLogin(true);
        //     // }
        // };
        // getToken();
        console.log('data user', data);
    }, []);

    return (
        <NavigationContainer fallback={<Text>Loading...</Text>}>
            <Root.Navigator screenOptions={screenOptions}>
                {data?.token ? (
                    <Root.Screen name={SCREENS.MAIN_STACK} component={MainStack} />
                ) : (
                    <Root.Screen name={SCREENS.AUTH_STACK} component={AuthStack} />
                )}
            </Root.Navigator>
        </NavigationContainer>
    );
};

export default AppContainer;
