import React, { useLayoutEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Box, ScrollView, useTheme } from 'native-base';
import { ListItem, HeaderBar, scale } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '@src/navigation';
import { formatPhoneNumber } from '@src/utils';

import Avatar from './Components/Avatar';

const userData = {
    name: 'Nguyễn Văn Vui',
    address: '18b Láng Hạ, Đống Đa',
    phone: '+84973821099',
    avatar: 'https://noidangsong.vn/files/uploads/fb1735058496563345/1526444239-tt_avatar_small.jpg',
};
const PersonalInfoComponent = () => {
    const { colors, fonts } = useTheme();
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    useLayoutEffect(() => {
        if (userData) {
            if (userData.phone.slice(0, 3) === '+84') {
                const newPhone = '0'.concat(userData.phone.slice(3, -1));
                setPhone(newPhone);
            }
        }
    }, []);

    return (
        <Box safeArea px={`${scale(16)}px`} bg={colors.white} h='100%'>
            {/* <StatusBar backgroundColor={colors.blue} barStyle='dark-content' /> */}
            <HeaderBar
                nameIconRight='pencil'
                navigation={navigation}
                onPressRight={() => navigation.navigate(SCREENS.PERSONAL_INFO_EDIT_SCREEN, { ...userData, phone })}
            />
            <ScrollView mt='10px'>
                <Avatar title='Đại lý cường vui' catName='Đại lý' avatarURL={userData.avatar} />
                <Box w='full' mt='40px'>
                    <ListItem label='Người đại điện' value={userData.name} />
                    <ListItem label='Địa chỉ' value={userData.name} />
                    <ListItem label='Số điện thoại' value={formatPhoneNumber(userData.phone)} />
                </Box>
            </ScrollView>
        </Box>
    );
};

export const PersonalInfoScreen = React.memo(PersonalInfoComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);
