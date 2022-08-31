import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import isEqual from 'react-fast-compare';
import { Box, Center, useTheme, Text, HStack, useToast } from 'native-base';
import { Button, Image, InputForm, scale, Touchable, vScale } from '@src/components';
import { images } from '@src/assets';
import { useForm } from 'react-hook-form';
import logger from '@src/utils/common/logger';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '@src/navigation';
import { ACCESS_TOKEN, IS_LOGIN, useGlobalState } from '@src/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    onPress?: () => void;
    loading: boolean;
};

const CodeOTPComponent = ({ onPress, loading }: Props, ref: any) => {
    const { colors } = useTheme();
    const toast = useToast();

    const phone = ref?.current?.getPhone();
    const navigation = useNavigation();

    const [_, setIsLogin] = useGlobalState<boolean>(IS_LOGIN, false);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            otp: '',
        },
    });

    const onSubmit = async (data: any) => {
        // const phone = ref?.current?.getPhone();
        const confirmCode = ref?.current?.getConfirm()._verificationId;
        const { otp } = data;
        try {
            if (confirmCode && data && phone) {
                const credential = auth.PhoneAuthProvider.credential(confirmCode, otp);
                const res = await auth().signInWithCredential(credential);
                if (res && res.user) {
                    const firebaseToken = await auth().currentUser?.getIdToken();
                    if (firebaseToken) {
                        await AsyncStorage.setItem(ACCESS_TOKEN, firebaseToken);
                        toast.show({
                            description: 'Xác nhận thành công',
                        });
                        setIsLogin(true);
                        navigation.navigate(SCREENS.MAIN_STACK);
                    }
                }
            }
        } catch (error) {
            toast.show({
                description: 'Sai mã OTP',
            });
        }
    };

    // useEffect(() => {
    //     setPhone(ref?.current?.getPhone());
    // }, [phone, ref?.current?.getPhone()]);

    return (
        <Box>
            <Image source={images.logo} style={styles.logo} />
            <Box mt={10}>
                <Box pointerEvents={loading ? 'none' : 'auto'}>
                    <Text fontSize='24px' mb='12px' fontWeight='bold'>
                        Mã OTP
                    </Text>
                    <Text fontSize='14px' color={colors.darkNeu}>
                        Nhập mã OTP vừa được gửi tới số điện thoại {phone}.
                    </Text>
                </Box>
            </Box>
            <Center>
                <InputForm
                    control={control}
                    name='otp'
                    // title='Số điện thoại'
                    placeholder='Nhập mã OTP'
                    fontSize='16px'
                    mt='40px'
                    keyboardType='number-pad'
                />
            </Center>
            <Button title='Xác nhận' h='48px' mt='32px' onPress={handleSubmit(onSubmit)} />
            <Center mt='16px'>
                <HStack>
                    <Text mr='2px'>Không nhận được mã OTP?</Text>
                    <Touchable>
                        <Text color={colors.blue} fontWeight='bold'>
                            Gửi lại
                        </Text>
                    </Touchable>
                </HStack>
            </Center>
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

export const CodeOTP = React.memo(forwardRef(CodeOTPComponent), (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);
