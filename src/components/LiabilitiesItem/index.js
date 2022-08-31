import React from 'react';
import { View, Text } from 'native-base';
import { vScale } from 'components/index';
import { StyleSheet } from 'react-native';
import numeral from 'numeral';

function LiabilitiesItem({ name, color, price, style, styleName, stylePrice, toUpperCase = true }) {
    return (
        <View row full style={[styles.item, style]}>
            <Text size14 darkNeu hBold style={styleName}>
                {toUpperCase ? name.toUpperCase() : name}
            </Text>
            <Text style={[{ color }, stylePrice]} hBold>
                {numeral(price).format()}đ
            </Text>
        </View>
    );
}

export default LiabilitiesItem;
const styles = StyleSheet.create({
    item: {
        marginTop: vScale(13),
    },
});
