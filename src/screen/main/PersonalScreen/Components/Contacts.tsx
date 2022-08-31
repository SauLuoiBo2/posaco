import { StyleSheet } from 'react-native';
import React from 'react';
import { Icon, scale, Touchable, vScale } from '@src/components';
import { Box, HStack, Text, useTheme, VStack } from 'native-base';

type Props = {
    title: string;
    iconName: string;
    labelTxt?: string;
    colorBg: string;
    onPress: () => void;
};

const Contacts = ({ title, iconName, colorBg, labelTxt, onPress }: Props) => {
    const { colors, fonts } = useTheme();
    return (
        <Touchable onPress={onPress} style={styles.container}>
            <HStack alignItems='center'>
                <Box
                    bg={colorBg}
                    w={`${scale(32)}px`}
                    h={`${vScale(32)}px`}
                    borderRadius={40}
                    justifyContent='center'
                    alignItems='center'
                    mr='16px'
                >
                    <Icon name={iconName} color={colors.white} />
                </Box>
                <VStack>
                    <Text color={colors.dark} fontSize='16px'>
                        {title}
                    </Text>
                    {labelTxt && (
                        <Text fontSize='12px' color={colors.darkNeu}>
                            {labelTxt}
                        </Text>
                    )}
                </VStack>
            </HStack>
        </Touchable>
    );
};

export default React.memo(Contacts);

const styles = StyleSheet.create({
    container: {
        marginBottom: vScale(16),
    },
});
