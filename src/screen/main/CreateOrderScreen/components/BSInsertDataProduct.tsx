import { StyleSheet } from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Actionsheet, Box, Text, useDisclose, useTheme } from 'native-base';
import logger from '@src/utils/common/logger';
import { Button, InputForm, scale, vScale } from '@src/components';
import { useForm } from 'react-hook-form';
import { useCreateOrder } from '@src/queries';

interface dataForm {
    size: string;
    amountSheet: number | string;
}

interface Props {
    dataField: any;
    setDataField: any;
}

const BSInsertDataProduct = ({ dataField, setDataField }: Props, ref: React.Ref<unknown>) => {
    const { colors, fonts } = useTheme();
    const { isOpen, onOpen, onClose } = useDisclose();
    const [idProduct, setIdProduct] = useState<string | null>(null);
    const { control, handleSubmit, reset, setValue } = useForm<dataForm>({
        defaultValues: {
            size: '',
            amountSheet: '',
        },
    });

    const { addDataToProduct, updateDataFromProduct } = useCreateOrder();

    useImperativeHandle(ref, () => ({
        onOpen: (id: string) => {
            setIdProduct(id);
            return onOpen();
        },
    }));

    const handleAddDataProduct = (data: dataForm) => {
        if (!dataField) {
            addDataToProduct(data, idProduct);
        } else {
            updateDataFromProduct(dataField.index, dataField.productId, data);
            // handle Close swipe
            dataField.rowMap[dataField.key].closeRow();
        }
        onClose();
    };

    useEffect(() => {
        logger.debug('datafield', dataField);
        if (dataField) {
            setValue('size', dataField?.size);
            setValue('amountSheet', String(dataField?.amountSheet));
        } else {
            reset({
                size: '',
                amountSheet: '',
            });
        }
    }, [dataField, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setDataField(null);
        }
    }, [isOpen]);
    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content bg={colors.white}>
                <Box w='full' px={`${scale(16)}px`}>
                    <Text fontWeight='bold' fontSize={18} textAlign='left' mb='16px'>
                        Nhập thông tin
                    </Text>
                    <InputForm
                        control={control}
                        title='Kích thước (mm)'
                        name='size'
                        placeholder='Nhập kích thước'
                        keyboardType='numeric'
                        placeholderTextColor={colors.textHolderInput}
                        h='40px'
                        fontSize={16}
                        bg={colors.light}
                        mb={`${vScale(16)}px`}
                    />
                    <InputForm
                        control={control}
                        title='Số tấm'
                        name='amountSheet'
                        placeholder='Nhập số tấm'
                        keyboardType='numeric'
                        placeholderTextColor={colors.textHolderInput}
                        h='40px'
                        fontSize={16}
                        bg={colors.light}
                        mb={`${vScale(24)}px`}
                    />
                    <Button
                        onPress={handleSubmit(handleAddDataProduct)}
                        title='Tiếp theo'
                        h='48px'
                        _text={{ fontSize: 16 }}
                    />
                </Box>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default React.memo(forwardRef(BSInsertDataProduct));

const styles = StyleSheet.create({});
