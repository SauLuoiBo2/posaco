import { StatusBar } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Box, ScrollView, useTheme } from 'native-base';
import logger from '@src/utils/common/logger';
import { Liabilities, Popup } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import { ACCESS_TOKEN, IS_LOGIN, useAuth, useGlobalState } from '@src/queries';
import { SCREENS } from '@src/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Components/Header';
import ListItem from './Components/ListItem';

const PersonalComponent = () => {
    const { colors, fonts } = useTheme();
    const navigation = useNavigation();

    const modal: any = useRef();

    const [isLogin, setIsLogin] = useGlobalState<boolean>(IS_LOGIN);

    const [bgColor, setBgColor] = useState(colors.white);
    const [barStyle, setBarStyle] = useState<any>('light-content');

    const { logout } = useAuth();

    const onLogout = () => modal.current.show();

    const handleLogOut = async () => {
        if (isLogin) {
            setIsLogin(false);
            navigation.navigate(SCREENS.AUTH_STACK);
            await AsyncStorage.removeItem(ACCESS_TOKEN);
        }
    };

    useEffect(() => {
        navigation.addListener('focus', () => {
            setBgColor(colors.blue);
            setBarStyle('light-content');
        });
        navigation.addListener('blur', () => {
            setBgColor(colors.white);
            setBarStyle('dark-content');
        });
    }, []);

    return (
        <Box flex={1} bg={colors.white}>
            <StatusBar backgroundColor={bgColor} barStyle={barStyle} />
            <ScrollView bg={colors.white} flex={1} showsVerticalScrollIndicator={false}>
                <Header colors={colors} fonts={fonts} />
                <Box px='16px' py='32px'>
                    <Liabilities onPress={() => navigation.navigate(SCREENS.PERSONAL_LIABILITIES_SCREEN)} />
                    <ListItem mt='32px' navigation={navigation} onLogout={onLogout} />
                </Box>
                <Popup
                    ref={modal}
                    typePopup='warn'
                    titlePopup='Đăng xuất'
                    description='Bạn có chắc chắn muốn đăng xuất khỏihệ thống?'
                    onPressLeft={logout}
                    onPressRight={() => modal.current.hide()}
                />
            </ScrollView>
        </Box>
    );
};

export const PersonalScreen = React.memo(PersonalComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps));
