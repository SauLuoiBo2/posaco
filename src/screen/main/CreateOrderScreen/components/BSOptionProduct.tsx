import { StyleSheet } from 'react-native';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Actionsheet, Box, HStack, Text, useDisclose, useTheme } from 'native-base';
import { Icon, scale, Touchable } from '@src/components';
import { themes } from '@src/utils';
import logger from '@src/utils/common/logger';
import { ProductOrder } from '@src/queries';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SCREENS } from '@src/navigation';

interface Props {
    openModalEditProduct: () => void | null;
    openModalAddInforProduct: () => void | null;
    openModalRemoveProduct: () => void | null;
    dataProduct: ProductOrder | null;
}

const BSOptionProduct = (
    { openModalAddInforProduct, openModalRemoveProduct, openModalEditProduct, dataProduct }: Props,
    ref: React.Ref<unknown>
) => {
    const { colors, fonts } = useTheme();
    const { isOpen, onOpen, onClose } = useDisclose();
    // const navigation: NavigationProp<any> = useNavigation();

    useImperativeHandle(ref, () => ({
        onOpen: () => onOpen(),
        onClose: () => onClose(),
    }));

    logger.debug('dataProduct', dataProduct);

    const handleEditProduct = () => {
        // logger.debug('handleEditProduct', null);
        openModalEditProduct();
        // onClose();
        // navigation.navigate(SCREENS.PRODUCT_CALCULATE_SCREEN, { dataEdit: dataProduct });
    };

    const handleAddDataInformationProduct = () => {
        logger.debug('handleInsert', null);
        openModalAddInforProduct();
    };

    const handleRemoveProduct = () => {
        openModalRemoveProduct();
    };

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content bg={colors.white}>
                <Box w='full' px={`${scale(16)}px`}>
                    <Touchable style={styles.touchAble} onPress={handleEditProduct}>
                        <HStack alignItems='center'>
                            <Icon name='pencil' color={colors.dark} fontSize={22} />
                            <Text color={colors.dark} fontSize={16} ml='12px' fontWeight='medium'>
                                Chỉnh sửa thông tin
                            </Text>
                        </HStack>
                    </Touchable>
                    <Touchable style={styles.touchAble} onPress={handleAddDataInformationProduct}>
                        <HStack alignItems='center'>
                            <Icon name='plus' color={colors.dark} fontSize={22} />
                            <Text color={colors.dark} fontSize={16} ml='12px' fontWeight='medium'>
                                Thêm kích thước sản phẩm này
                            </Text>
                        </HStack>
                    </Touchable>
                    <Touchable style={styles.touchAble}>
                        <HStack alignItems='center'>
                            <Icon name='plus' color={colors.dark} fontSize={22} />
                            <Text color={colors.dark} fontSize={16} ml='12px' fontWeight='medium'>
                                Thêm sản phẩm cùng chủng loại
                            </Text>
                        </HStack>
                    </Touchable>
                    <Touchable style={styles.touchAble}>
                        <HStack alignItems='center'>
                            <Icon name='plus' color={colors.dark} fontSize={22} />
                            <Text color={colors.dark} fontSize={16} ml='12px' fontWeight='medium'>
                                Thêm sản phẩm cùng chủng loại
                            </Text>
                        </HStack>
                    </Touchable>
                    <Touchable style={styles.touchAble} onPress={handleRemoveProduct}>
                        <HStack alignItems='center'>
                            <Icon name='trash' color={colors.red} fontSize={22} />
                            <Text color={colors.red} fontSize={16} ml='12px' fontWeight='medium'>
                                Xoá sản phẩm
                            </Text>
                        </HStack>
                    </Touchable>
                </Box>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default React.memo(forwardRef(BSOptionProduct));

const styles = StyleSheet.create({
    touchAble: {
        height: 48,
        borderBottomWidth: 1,
        borderBottomColor: themes.colors.light,
    },
});
