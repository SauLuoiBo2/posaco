import React from 'react';
import { StyleSheet, View } from 'react-native';
import isEqual from 'react-fast-compare';
import { Box, Center, useTheme, Text } from 'native-base';
import { Button, Image, scale, vScale } from '@src/components';
import { images } from '@src/assets';

type Props = {
    onPress?: () => void;
};

const IntroCompontent = ({ onPress }: Props) => {
    const { colors } = useTheme();

    return (
        <Box>
            <Image source={images.logo} style={styles.logo} />
            <Box mt={10}>
                <Box>
                    <Text fontSize='24px' mb='12px' fontWeight='bold'>
                        Ứng dụng dành cho Đại lý
                    </Text>
                    <Text fontSize='14px' color={colors.darkNeu}>
                        Vui lòng đăng nhập để bắt đầu sử dụng ứng dụng dành cho Đại lý của POSHACO.
                    </Text>
                </Box>
            </Box>
            <Center>
                <Image source={images.imgLogin} style={styles.imgLogin} />
            </Center>
            <Button title='Đăng nhập' h='48px' mt='32px' onPress={onPress} />
        </Box>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: scale(121),
        height: scale(45),
        marginTop: vScale(10),
    },
    imgLogin: {
        width: scale(200),
        height: scale(200),
    },
});

export const Intro = React.memo(IntroCompontent, (prevProps, nextProps) => isEqual(prevProps, nextProps));
