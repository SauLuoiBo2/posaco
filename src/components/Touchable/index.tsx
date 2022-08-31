import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import React, { ReactElement } from 'react';
import { throttle } from 'lodash';

type Props = {
    children?: ReactElement;
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<TextStyle>;
};

const Touchable = ({ children, onPress, ...props }: Props) => (
    <TouchableOpacity onPress={onPress && throttle(onPress, 0, { leading: true })} {...props}>
        {children}
    </TouchableOpacity>
);

export default Touchable;
