/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Box, HStack, ScrollView, Text, useTheme, useToast } from 'native-base';
import { v4 as uuidv4 } from 'uuid';
import { InputDropDown, HeaderBar, scale, Touchable, vScale, Button } from '@src/components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { themes } from '@src/utils';
import { StyleSheet } from 'react-native';
import { images } from '@src/assets';
import numeral from 'numeral';
import { ProductOrder, useCreateOrder } from '@src/queries';
import logger from '@src/utils/common/logger';

import BottomSheetCalculate from './components/BottomSheetCalculate';

interface Props {
    route: any
}

interface DataBS {
    title: string;
    typeBS: string;
    options: any
}

const ProductCalculateComponent = ({ route }: Props) => {
    const { colors, fonts } = useTheme();
    const toast = useToast();

    const { params } = route;
    const isFocus = useIsFocused();

    const currentData = params?.currentData
    const productData = params?.productData;


    const navigation = useNavigation();
    const BSCalculate: React.Ref<any> = useRef();
    const [typeScreen, setTypeScreen] = useState();

    const [checked, setChecked] = useState(productData?.brand[0]?.id ?? 0);
    const [dataBS, setDataBS] = useState<DataBS | null>(null);
    const [price, setPrice] = useState(0);

    const [specificationsSelected, setSpecificationsSelected] = useState<any>(null);
    const [propertiesSelected, setPropertiesSelected] = useState<any>(null);
    const [isFirstFocus, setIsFirstFocus] = useState<boolean>(true);

    const { addProductToOrder, updateProduct } = useCreateOrder();


    const handleChecked = (index: number) => {
        if (index !== checked) {
            setChecked(index);
        }
    };

    const handleChoseDropdown = useCallback(
        (key: string) => {
            const newData = {
                title: productData?.brand?.find(({ id }: any) => id === checked)?.title,
                options: productData?.brand?.find(({ id }: any) => id === checked)?.[key],
                typeBS: key,
            };
            setDataBS(newData);
            BSCalculate.current.open();
        },
        [checked]
    );

    const handleChoseOption = () => {
        const dataBSSelected = BSCalculate.current.getDataSelect();
        const typeBS = BSCalculate.current.getTypeBS()
        let textDropDown = '';
        const newDataBSSlected = Object.entries(dataBSSelected)
            .filter(value => dataBS?.options[value[0]])
            .map((value) =>
                dataBS?.options[value[0]].find(({ id }: any) => id === value[1])
            );

        for (const key in newDataBSSlected) {
            if (newDataBSSlected) {
                textDropDown += `${newDataBSSlected[key]?.title} ${Number(key) < Number(newDataBSSlected.length) - 1 ? ' & ' : ''
                    }`;
            }
        }
        if (typeBS === 'properties') {
            setPropertiesSelected({ ...dataBSSelected, text: textDropDown });
        }
        if (typeBS === 'specifications') {
            setSpecificationsSelected({ ...dataBSSelected, text: textDropDown });
        }

        setPrice(BSCalculate.current.getPrice());
        BSCalculate.current.close();
    };

    const buttonContent = () => (
        <HStack flexWrap='wrap' px={`${scale(16)}px`} justifyContent='flex-start' mx={`-${scale(5)}px`}>
            {productData?.brand &&
                productData?.brand.length > 0 &&
                productData.brand.map((item: any, index: number) => {
                    const styleBtn = String(checked) === item?.id ? styles.btnLabelActive : styles.btnLabel;
                    const styleText = String(checked) === item?.id ? styles.btnTextBlue : styles.btnTextGray;
                    return (
                        <Box w={`${(1 / 3) * 100}%`} px={`${scale(5)}px`} key={index}>
                            <Touchable
                                style={[styles.btnLabelDefault, styleBtn]}
                                onPress={() => handleChecked(item?.id)}
                            >
                                <Text fontFamily='hBold' fontWeight='bold' fontSize='16px' style={styleText}>
                                    {item?.title}
                                </Text>
                            </Touchable>
                        </Box>
                    );
                })}
        </HStack>
    );

    const handleAddProduct = () => {
        const dataParams: ProductOrder = {
            id: uuidv4(),
            title: dataBS?.title ?? '',
            price,
            dimension: '1',
            dataInfo: [],
            totalMeterial: 0,
            totalPrice: 0,
            species: productData?.id,
            brand: checked,
            selected: {
                specifications: specificationsSelected,
                properties: propertiesSelected
            },
        }
        if (!specificationsSelected || !propertiesSelected) {
            return toast.show({
                title: "Vui lòng nhập đủ thông tin sản phẩm",
                placement: "bottom"
            })
        }
        if (!currentData) {
            addProductToOrder(dataParams);
        } else {
            updateProduct(currentData.id, dataParams);
        }

        return navigation.goBack();
    }

    useEffect(() => {
        if (currentData && isFirstFocus) {
            setChecked(currentData?.brand);
            setSpecificationsSelected(currentData?.selected?.specifications);
            setPropertiesSelected(currentData?.selected?.properties);
            setPrice(currentData?.price);
            setIsFirstFocus(false);
        } else {
            setSpecificationsSelected(null);
            setPropertiesSelected(null);
            setPrice(0);
            BSCalculate.current.resetField();
        }
    }, [currentData, checked])

    return (
        <Box safeArea flex={1} bg={colors.white}>
            <HeaderBar title={typeScreen ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'} navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {productData?.brand.length > 0 && (
                    <Box px={`${vScale(16)}px`} mb='8px'>
                        <Text color={colors.black} fontFamily='hMedium' fontSize='14px' mt='32px'>
                            Hãng tôn
                        </Text>
                    </Box>
                )}

                {buttonContent()}
                <Box mt='16px'>
                    <InputDropDown
                        onPress={() => handleChoseDropdown('specifications')}
                        data={colorsData}
                        label='Thông số kĩ thuật'
                        placeholder='Chọn chủng loại'
                        mb='16px'
                        value={specificationsSelected?.text ?? ''}
                    />
                    <InputDropDown
                        onPress={() => handleChoseDropdown('properties')}
                        data={colorsData}
                        label='Độ dày & Màu gãy'
                        placeholder='Chọn màu sắc'
                        value={propertiesSelected?.text ?? ''}
                    />
                </Box>
            </ScrollView>
            <Box
                px={`${scale(16)}px`}
                pt={`${vScale(16)}px`}
                pb={`${vScale(26)}px`}
                style={styles.shadow}
                bg={colors.white}
                w='full'
            >
                <HStack justifyContent='space-between' alignItems='center' mb='12px'>
                    <Text fontSize='16px'> Đơn giá:</Text>
                    <Text fontWeight='bold' fontSize='20px' fontFamily={fonts.hBold} color={colors.green}>
                        {numeral(price || 0).format()} ₫
                    </Text>
                </HStack>
                <Button _text={{ fontSize: 16 }} title={`${currentData ? 'Sửa sản phẩm' : 'Thêm sản phẩm'} `} h='45px' onPress={handleAddProduct} />
            </Box>
            <BottomSheetCalculate defaultData={currentData} ref={BSCalculate} data={dataBS} checkedBrand={checked} onPress={handleChoseOption} />
        </Box>
    );
};

export const ProductCalculateScreen = React.memo(ProductCalculateComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);

const styles = StyleSheet.create({
    btnLabelDefault: {
        height: vScale(64),
        fontFamily: themes.fonts.hBold,
        marginBottom: vScale(9),
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLabel: {
        borderColor: themes.colors.lightGrey,
    },
    btnLabelActive: {
        borderColor: themes.colors.blueTory,
    },
    btnTextGray: {
        color: themes.colors.black,
    },
    btnTextBlue: {
        color: themes.colors.blueTory,
        fontFamily: themes.fonts.hBold,
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: vScale(26),
        shadowColor: themes.colors.darkNeu,
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: vScale(8),
        },
    },
});

const colorsData = [
    { id: '1', value: 'Đỏ', color: '#7F0B0C' },
    { id: '2', value: 'Rêu', color: '#1C4837' },
    { id: '3', value: 'Dương', color: '#2A4173' },
    { id: '4', value: 'Trắng', color: '#FFFFED' },
    { id: '5', value: 'Đen', color: '#505750' },
    { id: '6', value: 'Vân Đậm', color: '#FFFFFF', image: images.woodBold },
    { id: '7', value: 'Vân nhạt', color: '#FFFFFF', image: images.woodNormal },
];


