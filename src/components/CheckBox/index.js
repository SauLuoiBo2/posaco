/* eslint-disable indent */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { scale, vScale, Image } from 'components/index';
import { Colors } from 'themes';
import images from 'src/assets/images';

import Touchable from '../Touchable';

function CheckBox({ onPress, disabled, label, isChecked, radio }) {
    const srcCheck = isChecked
        ? disabled
            ? images.disCheck
            : images.check
        : disabled
        ? images.disUnCheck
        : images.unCheck;

    const srcRadio = isChecked
        ? disabled
            ? images.disRadioCheck
            : images.radioCheck
        : disabled
        ? images.disRadioUnCheck
        : images.radioUnCheck;

    const srcBtn = radio ? srcRadio : srcCheck;

    const colorText = disabled ? styles.colorTextDisable : styles.colorTextActive;
    return (
        <Touchable style={styles.content} onPress={onPress}>
            <Image style={styles.imgCheck} source={srcBtn} />
            {label && (
                <Text size14 style={colorText}>
                    {`   ${label}`}
                </Text>
            )}
        </Touchable>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorTextActive: {
        color: Colors.dark,
    },
    colorTextDisable: {
        color: Colors.lightDisable,
    },
    imgCheck: {
        width: scale(24),
        height: scale(24),
    },
});
export default CheckBox;
