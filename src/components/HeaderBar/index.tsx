import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, HStack, Text, useTheme } from 'native-base';
import { scale, Touchable, Icon } from '@components/';
import { themes } from '@src/utils';

const HeaderBar = ({
    navigation,
    styleContent,
    title, // title center
    status, // status? : online | offline
    titleLeft, // titleLeft? | nameIconLeft
    nameIconLeft = 'back', // nameIconLeft?  | titleLeft
    onPressLeft, // onPressLeft: null | default
    titleRight, // titleRight? | nameIconRight
    nameIconRight, // nameIconRight? | titleRight
    onPressRight, // onPressRight: isRequire
    returnNull,
    ...props
}: any) => {
    const { colors, fonts } = useTheme();
    const pressLeft: any = () => {
        if (onPressLeft) {
            return onPressLeft();
        }
        return navigation.goBack();
    };

    const HeaderLeft = () => (
        <Box justifyContent='center'>
            {titleLeft ? (
                <Text fontSize='20px' fontFamily={fonts.hBold} fontWeight='bold'>
                    {titleLeft}
                </Text>
            ) : nameIconLeft ? (
                <Touchable style={styles.btnLeft} onPress={pressLeft}>
                    <Icon name={nameIconLeft} color={colors.blue} size={28} />
                </Touchable>
            ) : null}
        </Box>
    );

    const HeaderTitle = () => (
        <Box style={styles.center} pointerEvents='none'>
            {title && (
                <Text fontSize='18px' fontFamily='hBold' fontWeight='bold' color={colors.dark}>
                    {title}
                </Text>
            )}
            {status !== undefined ? (
                <Text style={status ? styles.online : styles.offline}>{status ? 'Đang online' : 'Offline'}</Text>
            ) : null}
        </Box>
    );

    const HeaderRight = () => (
        <Box style={[styleContent, returnNull && styles.returnNull]}>
            {titleRight ? (
                <Text>{titleRight}</Text>
            ) : nameIconRight ? (
                <Touchable style={styles.btnRight} onPress={onPressRight}>
                    <Icon name={nameIconRight} color={colors.blue} size={24} />
                </Touchable>
            ) : null}
        </Box>
    );

    return (
        <HStack justifyContent='space-between' {...props}>
            <HeaderLeft />
            <HeaderTitle />
            <HeaderRight />
        </HStack>
    );
};

const styles = StyleSheet.create({
    returnNull: {
        borderBottomWidth: 0,
    },
    btnRight: {
        height: scale(40),
        width: scale(40),
        borderRadius: scale(25),
        backgroundColor: themes.colors.btnHeader,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3,
    },
    btnLeft: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    center: {
        height: '100%',
        width: scale(375),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    online: {
        // color: Colors.green,
        textAlign: 'center',
        marginTop: -3,
    },
    offline: {
        // color: Colors.red,
        textAlign: 'center',
        marginTop: -3,
    },
});
export default HeaderBar;
