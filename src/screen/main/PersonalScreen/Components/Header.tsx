import React from 'react';
import { Box, HStack, Text } from 'native-base';
import { images } from '@src/assets';
import { ImageBackground, StyleSheet } from 'react-native';
import { Image, scale, vScale } from '@src/components';
import { themes } from '@src/utils';

const Header = ({ fonts, colors }: any) => (
    <Box>
        <ImageBackground source={images.bgUser} style={styles.container}>
            <Box flex={1} justifyContent='flex-end' ml={`${scale(30)}px`} pb={`${vScale(24)}px`}>
                <Image source={{ uri: `https://picsum.photos/80` }} style={styles.imageStyle} placeholder />
                <Text fontSize='24px' fontFamily={fonts.hBold} fontWeight='bold' color={colors.white}>
                    Đại lý cường vui
                </Text>
                <Text fontSize='16px' fontFamily={fonts.hMedium} color={colors.blueMalibu}>
                    Đại lý
                </Text>
            </Box>
        </ImageBackground>
    </Box>
);
const styles = StyleSheet.create({
    //   content: {
    //     marginLeft: scale(30),
    //     paddingBottom: vScale(24),
    //   },
    container: {
        width: scale(375),
        height: vScale(231),
    },
    imageStyle: {
        width: scale(80),
        height: scale(80),
        marginBottom: vScale(8),
        borderRadius: scale(40),
        borderColor: themes.colors.whiteBouser,
        borderWidth: 2,
    },
});

export default React.memo(Header);
