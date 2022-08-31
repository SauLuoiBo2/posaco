import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet } from 'react-native';
import isEqual from 'react-fast-compare';
import { Box, Center, useTheme, Text, useToast } from 'native-base';
import { Button, Image, InputForm, scale, vScale } from '@src/components';
import { images } from '@src/assets';
import { useForm } from 'react-hook-form';
import logger from '@src/utils/common/logger';
import auth from '@react-native-firebase/auth';

type Props = {
    onPress: () => void;
    loading: boolean;
};

const PhoneComponent = ({ onPress, loading }: Props, ref: any) => {
    const { colors } = useTheme();
    const toast = useToast();

    const [confirm, setConfirm] = useState<any>(null);

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            phone: '',
        },
    });

    useImperativeHandle(ref, () => ({
        getPhone: () => getValues('phone'),
        getConfirm: () => confirm,
    }));

    const onSubmit = async (data: any) => {
        logger.debug('onSubmit', null);
        if (data && onPress) {
            try {
                const firstCharacter = data?.phone.charAt(0);
                let phoneNumber = '+84';
                if (firstCharacter === '0') {
                    const cutNumber = data?.phone.slice(1, 10);

                    phoneNumber = phoneNumber.concat(cutNumber);
                }

                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                logger.debug('confirmation', confirmation);
                if (confirmation) {
                    setConfirm(confirmation);
                    onPress();
                }
            } catch (error) {
                logger.error('error', error);
                toast.show({
                    description: 'Không tìm thấy tài khoản. Xin thử lại',
                });
            }
        }
    };

    // const onSubmitError = async (err: any) => {
    //     if (err) {
    //         const inputName = Object.keys(err)[0] ?? null;
    //         logger.debug('inputNamei', inputName);
    //         resetField('phone');
    //         // inputName && resetField(String(inputName));
    //     }
    // };

    return (
        <Box>
            <Image source={images.logo} style={styles.logo} />
            <Box mt={10}>
                <Box pointerEvents={loading ? 'none' : 'auto'}>
                    <Text fontSize='24px' mb='12px' fontWeight='bold'>
                        Số điện thoại
                    </Text>
                    <Text fontSize='14px' color={colors.darkNeu}>
                        Nhập số điện thoại đã được liên kết với tài khoản POSHACO của bạn.
                    </Text>
                </Box>
            </Box>
            <Center>
                <InputForm
                    control={control}
                    // title='Số điện thoại'
                    placeholder='Nhập số điện thoại'
                    fontSize='16px'
                    mt='40px'
                    keyboardType='number-pad'
                    name='phone'
                    rules={{
                        required: 'Số điện thoại không được để trống',
                        pattern: {
                            value: /^[0-9]{10}/i,
                            message: 'Số điện thoại không hợp lệ',
                        },
                    }}
                />
                {errors.phone && (
                    <Box alignItems='flex-start' w='full' mt={2} mb='0'>
                        <Text color={colors.red} fontSize='14px'>
                            {errors?.phone?.message}
                        </Text>
                    </Box>
                )}
            </Center>
            <Button
                title='Tiếp tục'
                h='48px'
                mt='32px'
                // onPress={handleSubmit(onSubmit)}
                onPress={handleSubmit(onSubmit)}
            />
        </Box>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: scale(121),
        height: scale(45),
        marginTop: vScale(10),
    },
});

export const Phone = React.memo(forwardRef(PhoneComponent), (prevProps, nextProps) => isEqual(prevProps, nextProps));
