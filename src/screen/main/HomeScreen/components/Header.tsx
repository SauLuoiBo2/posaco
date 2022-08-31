import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, useTheme, Box, HStack } from 'native-base';
import { Icon, Image, scale, Touchable, vScale } from '@src/components';
import { themes } from '@src/utils';

const Header = ({ navigation, onPressAvatar, onPressNotification, userName }: any) => {
    const { colors } = useTheme();
    return (
        <HStack px={4} mt={`${vScale(40)}px`} pt={`${vScale(16)}px`} justifyContent='space-between'>
            <HStack>
                <Image
                    style={styles.avatar}
                    // onPress={onPressAvatar}
                    source={{
                        // uri: `http://dev.timevn.com:4000/api/v1/user/uploads/${infoUser.avatar}`,
                        uri: 'https://picsum.photos/40/40',
                    }}
                />
                <View>
                    <Text fontSize='14px' color={colors.white}>
                        Xin chào!
                    </Text>
                    <Text fontSize='18px' fontWeight='bold' color={colors.white}>
                        {/* {infoUser.fullName} */}
                        Nguyen Van A
                    </Text>
                </View>
            </HStack>
            <Touchable style={styles.btnRight} onPress={onPressNotification}>
                <Icon name='bell' color={colors.white} size={25} />
            </Touchable>
        </HStack>
    );
};

const styles = StyleSheet.create({
    // wrapper: {
    //     marginTop: variables.isIphoneX ? vScale(60) : vScale(40),
    // },
    avatar: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(25),
        marginRight: scale(12),
        zIndex: 1,
    },
    btnRight: {
        height: scale(40),
        width: scale(40),
        borderRadius: scale(20),
        backgroundColor: themes.colors.blueMalibu,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
    },
});

export default Header;
