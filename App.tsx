/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { themes } from '@src/utils';
import { QueryClientProvider } from 'react-query';
import { AuthProvider } from '@src/components';
import { queryClient } from 'src/queries/config';
import logger from '@src/utils/common/logger';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

import AppContainer from './src/navigation/AppContainer';

const theme = extendTheme(themes);

// logger.debug('messaging', messaging);

const App = () => {
    useEffect(() => {
        SplashScreen.hide();
        messaging()
            .getToken()
            .then((token) => {
                // logger.debug('token', token);
            });
    }, []);

    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <NativeBaseProvider theme={theme}>
                    <AuthProvider>
                        <AppContainer />
                    </AuthProvider>
                </NativeBaseProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
};
export default App;
