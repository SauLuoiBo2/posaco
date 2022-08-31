import { StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Box, Center, HStack, ScrollView, Text, TextArea, useTheme } from 'native-base';
import { Button, HeaderBar, Icon, Image, Popup, scale, Touchable, vScale } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import { renderImage, STATUS_ORDER, themes } from '@src/utils';
import StarRating from 'react-native-star-rating';
import logger from '@src/utils/common/logger';
import { useImagePicker } from '@src/hooks';
import { right } from 'styled-system';
import { ObjectRef } from '@src/components/Popup';

const dataStarRating = [
    {
        key: 1,
        title: 'Chất lượng sản phẩm',
        rating: 0,
    },
    {
        key: 2,
        title: 'Dịch vụ vận tải',
        rating: 0,
    },
    {
        key: 3,
        title: 'Kế toán bán hàng',
        rating: 0,
    },
];

const DetailOrderRatingComponent = () => {
    const { colors } = useTheme();
    const [ratingData, setRatingData] = useState<any>({});
    const navigation = useNavigation();
    const [imageDataUrl, setImageDataUrl] = useState<string[]>([]);
    const [textAreaInput, setTextAreaInput] = useState('');

    const { openPicker } = useImagePicker();

    const popupRef = useRef<any>(null);

    const handleRating = (rating: any, key: number) => {
        const newRatingData = { ...ratingData, [key]: rating };
        setRatingData(newRatingData);
    };

    const handlePickerImage = () => {
        openPicker(false, {
            onSuccess: (response: any) => {
                const newImageData = [...imageDataUrl];
                const fileName = response.path.replace(/^.*[\\\\/]/, '');
                newImageData.push(response.path);
                setImageDataUrl(newImageData);
                // setImageUrl(response.path);
                const formData = new FormData();
                formData.append('file', {
                    uri: response.path,
                    name: fileName,
                    type: response.mime,
                });
            },
        });
    };

    const handleRemoveImage = (index: number) => {
        const newImageData = [...imageDataUrl];
        newImageData.splice(index, 1);
        setImageDataUrl(newImageData);
    };

    const handleSubmit = () => {
        const dataReview = {
            rating: ratingData,
            text: textAreaInput,
            imageDataUrl,
        };
        if (dataReview) {
            popupRef.current.show();
            logger.debug('data submit', dataReview);
        }
    };

    return (
        <Box safeAreaTop bg={colors.white} flex={1}>
            <HeaderBar
                title='Đánh giá dịch vụ'
                navigation={navigation}
                px={`${scale(16)}px`}
                pb='16px'
                nameIconRight='support'
            />
            <ScrollView showsVerticalScrollIndicator={false} px={`${scale(16)}px`}>
                <Center mb={`${vScale(30)}px`}>
                    <Image source={renderImage(STATUS_ORDER.DELIVERED)} style={styles.image} />
                    <Text color={colors.dark} fontWeight='bold' fontSize={16} textAlign='center' mb='16px'>
                        Bạn thấy dịch vụ thế nào?
                    </Text>
                    <Text color={colors.darkNeu} textAlign='center'>
                        Hãy giúp chúng tôi cải thiện{'\n'} dịch vụ bằng cách đánh giá{'\n'} chất lượng sản phẩm và dịch
                        vụ vận chuyển
                    </Text>
                </Center>
                <Center>
                    {dataStarRating &&
                        dataStarRating.length > 0 &&
                        dataStarRating.map(({ key, title }) => (
                            <Box mb='30px'>
                                <Text
                                    color={colors.dark}
                                    fontWeight='medium'
                                    fontSize={16}
                                    textAlign='center'
                                    mb='16px'
                                >
                                    {title}
                                </Text>
                                <StarRating
                                    maxStars={5}
                                    fullStar='star'
                                    emptyStar='star'
                                    starSize={scale(38)}
                                    rating={ratingData[key] ?? 0}
                                    fullStarColor={colors.star}
                                    selectedStar={(rate: number) => handleRating(rate, key)}
                                    starStyle={styles.starRating}
                                    emptyStarColor={colors.lightGrey}
                                />
                            </Box>
                        ))}
                </Center>
                <Text color={colors.darkNeu} mb='6px'>
                    Nhận xét
                </Text>
                <TextArea
                    h='120px'
                    placeholder='Chia sẻ trải nghiệm của bạn!'
                    placeholderTextColor={colors.textHolderInput}
                    onChangeText={(text: string) => setTextAreaInput(text)}
                    fontSize={16}
                    w='full'
                    bg={colors.light}
                    borderWidth={0}
                    mb='16px'
                />
                {imageDataUrl.length > 0 ? (
                    <HStack mb='24px'>
                        {imageDataUrl.map((url, index) => (
                            <Box
                                style={styles.ContainerImageUpload}
                                bg={colors.black}
                                justifyContent='center'
                                alignItems='center'
                                position='relative'
                                mr='8px'
                                w='25%'
                                h='80px'
                            >
                                <Image source={{ uri: url }} style={styles.imageUpload} />
                                <Touchable style={styles.removeImageIcon} onPress={() => handleRemoveImage(index)}>
                                    <Text color={colors.white}>x</Text>
                                </Touchable>
                            </Box>
                        ))}
                        {imageDataUrl.length < 4 && (
                            <Touchable onPress={handlePickerImage}>
                                <Box
                                    borderWidth={1}
                                    borderColor={colors.blue}
                                    w={`${scale(80)}px`}
                                    h={`${scale(80)}px`}
                                    borderStyle='dashed'
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <Text color={colors.blue} fontSize='30px'>
                                        +
                                    </Text>
                                </Box>
                            </Touchable>
                        )}
                    </HStack>
                ) : (
                    <Button
                        leftIcon={<Icon name='camera' color={colors.blue} />}
                        title='Thêm hình ảnh'
                        h='48px'
                        isOutline
                        borderStyle='dashed'
                        onPress={handlePickerImage}
                        _text={{ fontSize: 16, color: colors.blue }}
                        mb='16px'
                    />
                )}

                <Button
                    leftIcon={<Icon name='microphone' color={colors.blue} />}
                    title='Thêm ghi âm'
                    h='48px'
                    isOutline
                    borderStyle='dashed'
                    _text={{ fontSize: 16, color: colors.blue }}
                />
                <Box pb={`${vScale(16)}px`} />
            </ScrollView>
            <Box px={`${scale(16)}px`} bg={colors.white} style={styles.shadow} pt='16px'>
                <Button
                    title='Gửi đánh giá'
                    h='48px'
                    _text={{ fontSize: 16, color: colors.white }}
                    onPress={handleSubmit}
                />
            </Box>
            <Popup
                titlePopup='Cảm ơn bạn đã đánh giá !'
                description={`Những đánh giá của bạn giúp chúng tôi${'\n'} cải thiện dịch vụ ngày một tốt hơn.`}
                titleButton1='Xong'
                ref={popupRef}
                onPressLeft={() => navigation.goBack()}
            />
        </Box>
    );
};

export const DetailOrderRatingScreen = React.memo(DetailOrderRatingComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);

const styles = StyleSheet.create({
    image: {
        height: scale(90),
        width: scale(90),
    },
    ContainerImageUpload: {
        height: scale(80),
        width: scale(80),
    },
    imageUpload: {
        height: '100%',
        width: '100%',
    },
    starRating: {
        paddingHorizontal: 8,
    },
    shadow: {
        paddingBottom: vScale(26),
        // backgroundColor: 'red',
        shadowColor: themes.colors.darkNeu,
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: vScale(8),
        },
    },
    removeImageIcon: {
        position: 'absolute',
        top: 1,
        right: 1,
    },
});
