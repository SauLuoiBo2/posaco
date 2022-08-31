import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { checkMultiple, PERMISSIONS, RESULTS, request, openSettings } from 'react-native-permissions';
import React, { useEffect } from 'react';
import ImagePickerCrop from 'react-native-image-crop-picker';
import logger from '@src/utils/common/logger';

const useImagePicker = () => {
    let photoPermission: any = null;
    let cameraPermission: any = null;

    const showPicker = (multiple: boolean, onSuccess: any, onError: any) => {
        ImagePickerCrop.openPicker({
            width: 100,
            height: 100,
            cropping: false,
            multiple,
            mediaType: 'photo',
        })
            .then((response) => {
                logger.debug('response', response);
                if (onSuccess) {
                    onSuccess(response);
                }
            })
            .catch((error) => {
                logger.debug('error', error);
                if (onError) {
                    onError();
                }
            });
    };

    const openPicker = async (multiple: any, { onSuccess, onError }: any) => {
        logger.debug('PERMISSIONS', PERMISSIONS);

        if (
            photoPermission === 'denied' ||
            photoPermission === 'blocked' ||
            cameraPermission === 'denied' ||
            cameraPermission === 'blocked'
        ) {
            const [camera, photo] = await Promise.all([
                request(
                    Platform.select({
                        android: PERMISSIONS.ANDROID.CAMERA,
                        ios: PERMISSIONS.IOS.CAMERA,
                    })
                ),
                request(
                    Platform.select({
                        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
                    })
                ),
            ]);
            logger.debug('camera, photo', camera, photo);
            if (camera === RESULTS.GRANTED || photo === RESULTS.GRANTED) {
                showPicker(multiple, onSuccess, onError);
            } else {
                Alert.alert(
                    'Thông báo',
                    'Bạn đã không cho phép ứng dụng truy cập Thư viện.\n Vào "Cài đặt" để sửa lại quyền truy cập',
                    [{ text: 'Cancel' }, { text: 'OK', onPress: () => openSettings() }],
                    { cancelable: false }
                );
            }
            return 0;
        }
        showPicker(multiple, onSuccess, onError);
    };

    useEffect(() => {
        if (Platform.OS === 'ios') {
            checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]).then((status) => {
                console.log('status - ios', status);
                cameraPermission = status[PERMISSIONS.IOS.CAMERA];
                photoPermission = status[PERMISSIONS.IOS.PHOTO_LIBRARY];
                logger.debug('status - ios', cameraPermission, photoPermission);
            });
        } else {
            checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then((status) => {
                console.log('status - android', status);
                cameraPermission = status[PERMISSIONS.ANDROID.CAMERA];
                photoPermission = status[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
            });
        }
    }, []);

    return { openPicker };
};

export default useImagePicker;

const styles = StyleSheet.create({});
