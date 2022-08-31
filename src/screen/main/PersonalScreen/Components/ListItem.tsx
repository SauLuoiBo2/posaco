import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, Text, useTheme } from 'native-base';
import { Icon, scale, Touchable, vScale } from '@src/components';

const Item = ({ icon, text, color, onPress, fonts }: any) => (
    <Touchable style={styles.itemDetail} onPress={onPress}>
        <>
            <Icon name={icon} color={color} size={28} style={styles.iconDetail} />
            <Text fontWeight='bold' style={{ color }}>
                {text}
            </Text>
        </>
    </Touchable>
);

const ListItem = ({ navigation, onLogout, ...props }: any) => {
    const { colors, fonts } = useTheme();
    return (
        <Box px={`${scale(14)}px`} {...props}>
            <Item
                icon='store'
                text='Thông tin đại lý của bạn'
                color={colors.darkNeu}
                fonts={fonts}
                onPress={() => navigation.navigate('PersonalInfoScreen')}
            />
            <Item
                icon='info-circle'
                text='Thông tin về Poshaco'
                color={colors.darkNeu}
                fonts={fonts}
                onPress={() => navigation.navigate('PersonalAboutUsScreen')}
            />
            <Item
                icon='help'
                text='Trung tâm trợ giúp'
                color={colors.darkNeu}
                fonts={fonts}
                onPress={() => navigation.navigate('PersonalSupportScreen')}
            />
            <Item icon='logout' text='Đăng xuất' color={colors.red} onPress={onLogout} />
        </Box>
    );
};

const styles = StyleSheet.create({
    itemDetail: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: vScale(12),
    },
    iconDetail: {
        marginRight: vScale(8),
    },
});

export default React.memo(ListItem);
