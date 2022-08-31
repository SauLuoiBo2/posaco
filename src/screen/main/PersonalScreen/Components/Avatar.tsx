import { StyleSheet } from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useState } from 'react';
import { Icon, Image, scale, Touchable, vScale } from '@src/components';
import { Avatar, Box, Text, useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import logger from '@src/utils/common/logger';
import { themes } from '@src/utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useImagePicker } from '@src/hooks';

type Props = {
    avatarURL?: string;
    title?: string;
    cameraIcon?: string;
    catName?: string;
};

const AvatarComponent = ({ avatarURL, title, cameraIcon, catName }: Props, ref: any) => {
    const { colors, fonts } = useTheme();
    const [imageUrl, setImageUrl] = useState(
        'https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png'
    );

    const { openPicker } = useImagePicker();
    const TouchableCamer = () =>
        cameraIcon && (
            <Touchable style={styles.touchableCamera} onPress={onPress}>
                <Icon name={cameraIcon} size={24} color={colors.white} />
            </Touchable>
        );

    const onPress = () => {
        openPicker(false, {
            onSuccess: (response: any) => {
                const fileName = response.path.replace(/^.*[\\\\/]/, '');
                setImageUrl(response.path);
                const formData = new FormData();
                formData.append('file', {
                    uri: response.path,
                    name: fileName,
                    type: response.mime,
                });
            },
        });
    };

    useImperativeHandle(ref, () => ({
        getImageUrl: () => imageUrl,
    }));

    useLayoutEffect(() => {
        if (avatarURL) {
            setImageUrl(avatarURL);
        }
    }, []);

    const imgURL =
        avatarURL ||
        'https://f1.pngfuel.com/png/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clip-art.png';

    return (
        <Box alignItems='center'>
            <Box style={styles.avatarContainer}>
                <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
                {TouchableCamer()}
            </Box>
            <Text mb='10px' fontSize='24px' fontWeight='bold' fontFamily={colors.hBold}>
                {title && title}
            </Text>
            <Box bg={colors.white1} borderRadius='50px' px='9px' py='2px'>
                <Text color={colors.blue} fontSize='12px'>
                    {catName && catName.toUpperCase()}
                </Text>
            </Box>
        </Box>
    );
};

export default React.memo(forwardRef(AvatarComponent));

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    avatarContainer: {
        width: scale(120),
        height: scale(120),
        borderRadius: scale(60),
        borderColor: 'rgba(0,0,0, 0.1)',
        borderWidth: 4,
        position: 'relative',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: scale(60),
    },
    touchableCamera: {
        position: 'absolute',
        top: scale(82),
        left: scale(80),
        width: scale(32),
        height: scale(32),
        backgroundColor: themes.colors.blue,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(32),
    },
});
