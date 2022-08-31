import { ListRenderItemInfo, StyleSheet } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';
import {
    Actionsheet,
    Box,
    Center,
    FlatList,
    HStack,
    StatusBar,
    Text,
    useTheme,
    VStack,
    Button as ButtonDefault,
} from 'native-base';
import { Button, HeaderBar, Icon, Popup, scale, Touchable, vScale } from '@src/components';
import { SCREENS } from '@src/navigation';
import { mockDataProduct } from '@src/utils/common/mockData';
import numeral from 'numeral';
import { ProductOrder, useCreateOrder } from '@src/queries';
import { SwipeListView } from 'react-native-swipe-list-view';
import { themes } from '@src/utils';
import logger from '@src/utils/common/logger';

import StepIndicator from './components/StepIndicatorOrder';
import BtnSelectProduct from './components/BtnSelectProduct';
import BSInsertDataProduct from './components/BSInsertDataProduct';
import BSOptionProduct from './components/BSOptionProduct';

const CreateOrderComponent = ({ navigation, route }: any) => {
    const { colors } = useTheme();
    const { params } = route;

    const productRef: any = useRef();
    const BSInsertDataProductRef: any = useRef();
    const BSRemoveInfoProductRef: React.Ref<any> = useRef();
    const BSRemoveProduct: React.Ref<any> = useRef();
    const BSOptionProductRef: React.Ref<any> = useRef();

    const { productOrder, removeDataFromProduct, removeProduct, price: totalPriceOrder } = useCreateOrder();

    const [dataInforProductSelected, setDataInforProductSelected] = useState<any>(null);
    const [dataProductSelected, setDataProductSelected] = useState<ProductOrder | null>(null);

    const listProductOrder = useMemo(() => productOrder?.products ?? [], [productOrder]);

    const handleContinue = useCallback(() => {
        const productData: any = productRef.current.getProductData();
        navigation.navigate(SCREENS.PRODUCT_CALCULATE_SCREEN, { productData });
        setVisibleSheet(false);
    }, []);

    const handleInsert = (id: string | unknown) => BSInsertDataProductRef.current.onOpen(id);

    const renderItem = ({ item, index }: any) => {
        const { dataInfo, totalMeterial, totalPrice, id } = item;
        const mapDataInfo = dataInfo?.length > 0 ? dataInfo.map((v: any, i: number) => ({ ...v, key: i })) : [];
        return (
            <Box mb={`${vScale(24)}px`}>
                <Box key={index} bg={colors.white} mb={`${vScale(8)}px`} px={`${scale(16)}px`} py={`${vScale(16)}px`}>
                    <HStack justifyContent='space-between'>
                        <Text fontWeight='bold' fontSize={16} w='70%'>
                            {item?.title}
                        </Text>
                        <Text fontSize={16}>{numeral(item.price || 0).format()}đ</Text>
                    </HStack>
                    <HStack
                        alignItems='baseline'
                        justifyContent='space-between'
                        borderBottomWidth={1}
                        borderColor={colors.lightGrey}
                        pb='12px'
                    >
                        <Text color={colors.darkNeu} textTransform='uppercase' fontSize={12}>
                            Khổ
                        </Text>
                        <Text fontSize={16} color={colors.dark}>
                            {item.dimension}cm
                        </Text>
                    </HStack>
                    <HStack pt='8px' justifyContent='space-between'>
                        <Text textTransform='uppercase' color={colors.darkNeu} fontWeight='bold' fontSize={12} w='30%'>
                            Kích thước
                        </Text>
                        <Text
                            textTransform='uppercase'
                            color={colors.darkNeu}
                            fontWeight='bold'
                            fontSize={12}
                            w='20%'
                            textAlign='center'
                        >
                            Tấm
                        </Text>
                        <Text
                            textTransform='uppercase'
                            color={colors.darkNeu}
                            fontWeight='bold'
                            fontSize={12}
                            w='20%'
                            textAlign='center'
                        >
                            Khổ
                        </Text>
                        <Text
                            textTransform='uppercase'
                            color={colors.darkNeu}
                            fontWeight='bold'
                            fontSize={12}
                            w='30%'
                            textAlign='right'
                        >
                            Số lượng
                        </Text>
                    </HStack>

                    <Box bg={colors.white} overflow='hidden' flex={1}>
                        {dataInfo && dataInfo?.length > 0 && (
                            <SwipeListView
                                data={mapDataInfo}
                                rightOpenValue={-165}
                                previewRowKey='0'
                                renderItem={(data: ListRenderItemInfo<any>) => (
                                    <Box>
                                        <HStack
                                            pt='8px'
                                            px='0'
                                            justifyContent='space-between'
                                            bg={colors.white}
                                            borderBottomWidth={1}
                                            borderColor={colors.btnHeader}
                                        >
                                            <HStack w='30%' justifyContent='space-between' position='relative'>
                                                <Text
                                                    textTransform='uppercase'
                                                    color={colors.dark}
                                                    fontWeight='medium'
                                                    fontSize={16}
                                                >
                                                    {data?.item?.size ?? `null`}
                                                </Text>
                                                <Text
                                                    position='absolute'
                                                    color={colors.textHolderInput}
                                                    fontSize={12}
                                                    right={`${scale(14)}px`}
                                                    bottom={`${vScale(2)}px`}
                                                >
                                                    X
                                                </Text>
                                            </HStack>
                                            <HStack w='20%' justifyContent='center' position='relative'>
                                                <Text
                                                    textTransform='uppercase'
                                                    color={colors.dark}
                                                    fontWeight='medium'
                                                    fontSize={16}
                                                    textAlign='center'
                                                >
                                                    {data?.item?.amountSheet ?? `null`}
                                                </Text>
                                                <Text
                                                    position='absolute'
                                                    color={colors.textHolderInput}
                                                    fontSize={12}
                                                    right={`-${scale(6)}px`}
                                                    bottom={`${vScale(2)}px`}
                                                >
                                                    X
                                                </Text>
                                            </HStack>
                                            <HStack w='20%' justifyContent='center' position='relative'>
                                                <Text
                                                    textTransform='uppercase'
                                                    color={colors.dark}
                                                    fontWeight='medium'
                                                    fontSize={16}
                                                    textAlign='center'
                                                >
                                                    {`${data?.item?.dimension}` ?? `null`}
                                                </Text>
                                            </HStack>
                                            <HStack w='30%' justifyContent='flex-end' position='relative'>
                                                <Text
                                                    position='absolute'
                                                    color={colors.textHolderInput}
                                                    fontSize={12}
                                                    left={`-${scale(6)}px`}
                                                    bottom={`${vScale(2)}px`}
                                                >
                                                    =
                                                </Text>
                                                <Text
                                                    textTransform='uppercase'
                                                    color={colors.dark}
                                                    fontWeight='medium'
                                                    fontSize={16}
                                                    // w='30%'
                                                    textAlign='right'
                                                >
                                                    {`${data?.item?.total.call(data?.item).toFixed(2)}` ?? `0`}
                                                </Text>
                                            </HStack>
                                        </HStack>
                                    </Box>
                                )}
                                renderHiddenItem={(data, rowMap) => {
                                    const { item: dataItem, index: i } = data;
                                    return (
                                        <HStack flex={1} ml='auto' pl={2}>
                                            <Touchable
                                                style={styles.btnDelete}
                                                onPress={() => {
                                                    const dataSelect = {
                                                        ...dataItem,
                                                        index: i,
                                                        productId: id,
                                                    };
                                                    setDataInforProductSelected(dataSelect);
                                                    BSRemoveInfoProductRef.current.show();
                                                }}
                                            >
                                                <Icon name='trash' size={21} color={colors.white} />
                                            </Touchable>
                                            <Touchable
                                                style={styles.btnEdit}
                                                onPress={() => {
                                                    const dataSelect = {
                                                        ...dataItem,
                                                        index: i,
                                                        productId: id,
                                                        rowMap,
                                                    };
                                                    setDataInforProductSelected(dataSelect);
                                                    handleInsert(id);
                                                }}
                                            >
                                                <Icon name='pencil' size={21} color={colors.white} />
                                            </Touchable>
                                        </HStack>
                                    );
                                }}
                            />
                        )}
                    </Box>

                    {dataInfo?.length > 0 ? (
                        <>
                            <HStack
                                mt='8px'
                                justifyContent='space-between'
                                alignItems='center'
                                // borderTopWidth={1}
                                // borderColor={colors.btnHeader}
                                pt='8px'
                            >
                                <Text w='50%' fontSize={16} color={colors.darkNeu}>
                                    Tổng số lượng
                                </Text>
                                <Box>
                                    <Text color={colors.dark} fontWeight='bold' fontSize='16px'>
                                        {totalMeterial.toFixed(2)}
                                    </Text>
                                </Box>
                            </HStack>
                            <HStack justifyContent='space-between' alignItems='center' pt='8px'>
                                <Text w='50%' fontSize={16} color={colors.darkNeu}>
                                    Thành tiền
                                </Text>
                                <Box>
                                    <Text color={colors.blue} fontWeight='bold' fontSize='16px'>
                                        {numeral(Number(totalPrice.toFixed(2))).format()}đ
                                    </Text>
                                </Box>
                            </HStack>
                        </>
                    ) : (
                        <HStack mt='8px' justifyContent='space-between' alignItems='center'>
                            <HStack w='50%' alignItems='center'>
                                <Icon name='info-circle' size={24} />
                                <Text ml='8px' fontSize={12}>
                                    Điền số tấm & kích thước để hoàn tất đơn hàng
                                </Text>
                            </HStack>
                            <Box>
                                <ButtonDefault onPress={() => handleInsert(item.id)} variant='unstyled'>
                                    <Text color={colors.blueMalibu} fontSize='16px'>
                                        Nhập dữ liệu
                                    </Text>
                                </ButtonDefault>
                            </Box>
                        </HStack>
                    )}
                </Box>
                {dataInfo?.length > 0 && (
                    <Button
                        title='Tùy chọn'
                        _text={{ fontSize: 16, color: colors.blue }}
                        h='48px'
                        isOutline
                        // onPress={() => handleInsert(item.id)}
                        onPress={() => {
                            const data = {
                                ...item,
                            };
                            setDataProductSelected(data);
                            BSOptionProductRef.current.onOpen();
                        }}
                        borderStyle='dashed'
                        leftIcon={<Icon name='plus' size={17} color={colors.blue} />}
                    />
                )}
            </Box>
        );
    };

    const ListEmpty = () => (
        <Center>
            <Text px={`${scale(16)}px`} fontSize='16px' mt={`${vScale(88)}px`} textAlign='center'>
                <Text fontSize='16px'>Chưa có sản phẩm nào. Nhấn vào nút</Text>
                <Text fontSize='16px' fontWeight='bold'>{` Thêm sản phẩm `}</Text>
                <Text fontSize='16px'>phía trên để thêm sản phẩm</Text>
            </Text>
        </Center>
    );

    const [isVisibleSheet, setVisibleSheet] = useState(false);
    return (
        <>
            <Box safeAreaTop bg={colors.white} position='relative' flex={1}>
                <StatusBar backgroundColor={colors.white} barStyle='dark-content' />
                <HeaderBar title='Chọn sản phẩm' navigation={navigation} />
                <StepIndicator currentStepp={0} mt={`${vScale(24)}px`} />
                <VStack bg={colors.light} px={`${scale(16)}px`} pt={`${vScale(20)}px`} h='full'>
                    <Text color={colors.dark} fontSize='16px' fontWeight='bold'>
                        Danh sách sản phẩm
                    </Text>
                    <Button
                        title='Thêm sản phẩm mới'
                        _text={{ fontSize: 16, color: colors.blue }}
                        h='48px'
                        isOutline
                        onPress={() => setVisibleSheet(true)}
                        borderStyle='dashed'
                        mt={`${vScale(12)}px`}
                        leftIcon={<Icon name='plus' size={17} color={colors.blue} />}
                    />
                    <Box flex={1} pt={`${vScale(24)}px`}>
                        <FlatList
                            data={listProductOrder}
                            renderItem={renderItem}
                            keyExtractor={(item: any, index: number) => `${index}`}
                            ListEmptyComponent={ListEmpty}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={<Box h={`${vScale(256)}`} />}
                        />
                    </Box>
                </VStack>
                <Box
                    flex={1}
                    position='absolute'
                    bottom={0}
                    left={0}
                    bg={colors.white}
                    w='full'
                    h={`${vScale(128)}px`}
                    px={`${scale(16)}px`}
                    pt={`${vScale(16)}px`}
                    pb={`${vScale(24)}px`}
                >
                    <HStack pb='12px' justifyContent='space-between'>
                        <Text color={colors.dark} fontSize={16}>
                            Tổng giá
                        </Text>
                        <Text color={colors.green} fontSize={20} fontWeight='bold'>
                            {numeral(totalPriceOrder ?? 0).format()}đ
                        </Text>
                    </HStack>
                    <Button title='Tiếp theo' h='48px' isDisabled={totalPriceOrder <= 0} />
                </Box>
            </Box>
            <Actionsheet isOpen={isVisibleSheet} onClose={() => setVisibleSheet(false)}>
                <Actionsheet.Content pt={`${vScale(16)}px`} px={`${scale(16)}px`} bg={colors.white}>
                    <Box>
                        <Text fontSize='14px' textAlign='left' mb='8px'>
                            Chọn sản phẩm
                        </Text>
                        <BtnSelectProduct data={mockDataProduct} ref={productRef} />
                        <Button
                            onPress={handleContinue}
                            mt='24px'
                            title='Tiếp tục'
                            h={`${vScale(48)}px`}
                            _text={{ fontSize: 16 }}
                        />
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
            <BSInsertDataProduct
                ref={BSInsertDataProductRef}
                dataField={dataInforProductSelected}
                setDataField={setDataInforProductSelected}
            />
            <BSOptionProduct
                ref={BSOptionProductRef}
                openModalAddInforProduct={() => {
                    handleInsert(dataProductSelected?.id);
                    BSOptionProductRef.current.onClose();
                }}
                openModalRemoveProduct={() => {
                    BSRemoveProduct.current.show();
                    BSOptionProductRef.current.onClose();
                }}
                openModalEditProduct={() => {
                    const productData = mockDataProduct.find(({ id }) => id === dataProductSelected?.species);
                    BSOptionProductRef.current.onClose();
                    navigation.navigate(SCREENS.PRODUCT_CALCULATE_SCREEN, {
                        productData,
                        currentData: dataProductSelected,
                    });
                }}
                dataProduct={dataProductSelected}
            />
            {/* REMOVE ROW PRODUCT */}
            <Popup
                titlePopup='Xoá kích thước sản phẩm'
                // eslint-disable-next-line prettier/prettier
                description={`Bạn có chắc chắn muốn xoá kích thước ${dataInforProductSelected?.size ?? `1`} x ${dataInforProductSelected?.amountSheet ?? `1`} tấm không?`}
                titleButton1='Xoá kích thước'
                titleButton2='Quay lại'
                typePopup='selection'
                onPressRight={() => {
                    BSRemoveInfoProductRef.current.hide();
                    setDataInforProductSelected(null);
                }}
                onPressLeft={() => {
                    removeDataFromProduct(dataInforProductSelected?.index, dataInforProductSelected?.productId);
                    BSRemoveInfoProductRef.current.hide();
                    setDataInforProductSelected(null);
                }}
                ref={BSRemoveInfoProductRef}
            />
            {/* REMOVE PRODUCT */}
            <Popup
                titlePopup='Xoá sản phẩm'
                // eslint-disable-next-line prettier/prettier
                description="Bạn có chắc chắn muốn xoá sản phẩm này không?"
                titleButton1='Xoá sản phẩm'
                titleButton2='Quay lại'
                typePopup='selection'
                onPressRight={() => {
                    BSRemoveProduct.current.hide();
                    setDataProductSelected(null);
                }}
                onPressLeft={() => {
                    removeProduct(dataProductSelected?.id);
                    BSRemoveProduct.current.hide();
                    setDataProductSelected(null);
                }}
                ref={BSRemoveProduct}
            />
        </>
    );
};

export const CreateOrderScreen = React.memo(CreateOrderComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);

const styles = StyleSheet.create({
    btnDelete: {
        backgroundColor: themes.colors.red61,
        width: 75,
        // height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnEdit: {
        backgroundColor: themes.colors.orange,
        width: 75,
        // height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
