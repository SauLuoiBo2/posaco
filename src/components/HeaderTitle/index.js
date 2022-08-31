import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import { Colors } from 'themes';

function HeaderTitle({ title, status }) {
    return (
        <View>
            {title && (
                <Text size18 hBold dark>
                    {title} +{' '}
                </Text>
            )}
            {status !== undefined ? (
                <Text size11 align hMedium style={status ? styles.online : styles.offline}>
                    {status ? 'Đang online' : 'Offline'}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    online: {
        color: Colors.green,
        textAlign: 'center',
        marginTop: -3,
    },
    offline: {
        color: Colors.red,
        textAlign: 'center',
        marginTop: -3,
    },
});

export default HeaderTitle;
