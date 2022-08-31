import React, { useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { HeaderBar } from '@src/components';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { View } from 'react-native';

import { Intro } from './components/Intro';
import { Phone } from './components/Phone';
import { CodeOTP } from './components/CodeOTP';

const LoginComponent = () => {
    const navigation: any = useNavigation();
    const [indexSwiper, setIndexSwiper] = useState<any>(0);
    const [loading, setLoading] = useState<any>(false);
    const phone = useRef();

    const onNext = () => {
        if (indexSwiper >= 0 && indexSwiper < 2) {
            setIndexSwiper(indexSwiper + 1);
        }
    };

    const onBack = () => {
        if (indexSwiper <= 2 && indexSwiper > 0) {
            setIndexSwiper(indexSwiper - 1);
        }
    };

    return (
        <Box safeArea h='100%' px='28px' pt={1} _dark={{ bg: 'warmGray.900' }} _light={{ bg: 'white' }}>
            <HeaderBar
                returnNull
                nameIconRight='support'
                nameIconLeft={indexSwiper > 0 ? 'back' : null}
                navigation={navigation}
                onPressLeft={onBack}
            />
            <ScrollableTabView locked page={indexSwiper} prerenderingSiblingsNumber={1} renderTabBar={() => <View />}>
                <Intro onPress={onNext} />
                <Phone onPress={onNext} loading={loading} ref={phone} />
                <CodeOTP onPress={onNext} loading={loading} ref={phone} />
            </ScrollableTabView>
        </Box>
    );
};

export const LoginScreen = React.memo(LoginComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));
