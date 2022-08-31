import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { scale, vScale, Touchable, ListItem } from 'components/index';
import { Colors } from 'themes';
import Icon from 'IconCustom';

function ShippingAddress({
    titleAgency = 'Người nhận',
    nameAgency = 'Vật liệu thành công',
    receiver = 'Nguyễn Văn Khánh',
    phone = '0973229889',
    address = 'Hoả Lò, Phúc Diễn, Từ Liêm, Hà Nội',
    isChoose,
    editable,
    onPress,
    defaultAdd,
    onEdit,
    style,
}) {
    return (
        <Touchable onPress={onPress} style={[styles.content, isChoose && styles.isChoose, style]}>
            <View row space width style={styles.line}>
                <View flex>
                    <Text size12 darkNeu hBold style={styles.upperCase}>
                        {titleAgency || ''}
                    </Text>
                    <Text size16 hBold numberOfLines={2} style={[styles.upperCase, styles.textMargin]}>
                        {nameAgency || ''}
                    </Text>
                </View>
                {editable ? (
                    <Touchable
                        onPress={onEdit}
                        disabled={isChoose}
                        style={[styles.btnEdit, isChoose && styles.paddingIcon]}
                    >
                        <Text size16 blueMalibu hMedium>
                            Chỉnh sửa
                        </Text>
                    </Touchable>
                ) : null}
                {isChoose ? (
                    <View row>
                        {defaultAdd && (
                            <Text size12 hMedium green>
                                Mặc định{'   '}
                            </Text>
                        )}
                        <Icon name='check-fill' color={Colors.green} size={18} />
                    </View>
                ) : null}
            </View>
            {receiver ? <ListItem label='Người nhận:' value={receiver} bold /> : null}
            {phone ? <ListItem label='Số điện thoại:' value={phone} /> : null}
            {address ? <ListItem label='Địa chỉ:' value={address} /> : null}
        </Touchable>
    );
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        backgroundColor: Colors.white,
        padding: scale(16),
        paddingBottom: scale(8),
    },
    upperCase: {
        textTransform: 'uppercase',
    },
    textMargin: {
        marginTop: 2,
    },
    isChoose: {
        borderColor: Colors.green,
        borderWidth: 1,
    },
    line: {
        flex: 1,
        borderColor: Colors.white1,
        borderBottomWidth: 1,
        paddingBottom: vScale(8),
        alignItems: 'flex-start',
        marginBottom: vScale(4),
    },
    btnEdit: {
        height: '100%',
        alignItems: 'flex-end',
    },
    paddingIcon: {
        paddingLeft: scale(25),
    },
});

export default ShippingAddress;
