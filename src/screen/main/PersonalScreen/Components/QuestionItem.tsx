import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import React from 'react';
import { scale, Touchable } from '@src/components';
import { HStack, Text, useTheme } from 'native-base';
import { color } from 'styled-system';
import { themes } from '@src/utils';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
    title: string;
    // style?: StyleProp<TextStyle>;
};

const QuestionItem = ({ title }: Props) => {
    const { colors, fonts } = useTheme();
    return (
        <Touchable style={styles.container}>
            <HStack alignItems='center' justifyContent='space-between'>
                <Text fontFamily={fonts.hRegular} fontSize='16px' color={colors.dark} maxW='90%'>
                    {title}
                </Text>
                <Icon name='chevron-right' color={colors.darkNeu} size={20} />
                {/* <Icon name='chevron-right' type='Octicons' color={colors.darkNeu} /> */}
            </HStack>
        </Touchable>
    );
};

export default React.memo(QuestionItem);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(24),
        paddingVertical: scale(16),
        borderBottomWidth: 1,
        borderColor: themes.colors.darkBouser,
    },
});
