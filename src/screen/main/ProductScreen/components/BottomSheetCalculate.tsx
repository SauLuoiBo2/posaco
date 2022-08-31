/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import React, {
    Children,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import { Actionsheet, Box, Divider, HStack, Icon, Radio, ScrollView, Text, useTheme, VStack } from 'native-base';
import Lightbox from 'react-native-lightbox-v2';
import { Button, Image, scale, Touchable, vScale } from '@src/components';
import { getLabelByTypeValue, themes } from '@src/utils';
import numeral from 'numeral';
import _ from 'lodash';
import logger from '@src/utils/common/logger';
import IconF from 'react-native-vector-icons/FontAwesome5';
import { useImagePicker } from '@src/hooks';

const BottomSheetCalculate = ({ data, onPress, defaultData }: any, ref: React.Ref<unknown> | undefined) => {
    const { colors } = useTheme();

    const [visible, setVisible] = useState(false);
    const [valueSelect, setValueSeclect] = useState<any>(null);
    const [selectedData, setSelectedData] = useState<any>(null);
    const [price, setPrice] = useState(0);

    const [imagesUpload, setImagesUpload] = useState<string[]>([]);
    const { openPicker } = useImagePicker();

    const { options, title, typeBS } = data || {};

    const resetField = () => {
        setValueSeclect({});
        setPrice(0);
    }

    const handlePickerImage = () => {
        openPicker(false, {
            onSuccess: (response: any) => {
                const newImageData: string[] = [...imagesUpload];
                const fileName = response.path.replace(/^.*[\\\\/]/, '');
                newImageData.push(response.path);
                setImagesUpload(newImageData);
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
        const newImageData = [...imagesUpload];
        newImageData.splice(index, 1);
        setImagesUpload(newImageData);
    };

    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
        getDataSelect: () => selectedData,
        getTypeBS: () => typeBS,
        getPrice: () => price,
        resetField: () => resetField(),
    }));


    const handleChangeValueSelect = (key: string, value: any) => {
        const newValueSelectd = { ...valueSelect };
        const oldPrice = options[key].find(({ id }: any) => newValueSelectd[key] === id)?.price ?? 0;
        const newPrice = options[key].find(({ id }: any) => value === id)?.price ?? 0;
        const setNewPrice = Number(price) + Number(newPrice) - Number(oldPrice);
        newValueSelectd[key] = value;
        setValueSeclect(newValueSelectd);
        setPrice(setNewPrice);

        const allChildrend = _.flatten(Object.values(options).map(val => val))
        const currentOption = options[key].find(({ id }: any) => value === id)
        // .filter(({ parent }: any) => parent && parent.length > 0)
        const newChild = _.union(allChildrend
            .map((val: any) => {
                let isChildren = false;
                if (val && currentOption.parent) {
                    for (const parentValue of currentOption.parent) {
                        logger.debug('parentValue', parentValue, val.id, parentValue.indexOf(val.id));
                        if (parentValue && parentValue.indexOf(val.id) !== -1) {
                            isChildren = true;
                            break;
                        }
                    }
                }
                return (!val.parent || isChildren || val?.type === currentOption.type) && val
            })
            .map(({ type }) => type)
            .filter(val => val !== undefined))
        setSelectedData(_.pick(newValueSelectd, newChild));
    };

    useEffect(() => {
        if (defaultData && typeBS) {
            const { text, ...newValueSelect } = defaultData?.selected[typeBS];
            setSelectedData(newValueSelect);
            setValueSeclect(newValueSelect);
            setPrice(defaultData?.price);
        }
    }, [defaultData, visible])

    return (
        <Actionsheet isOpen={visible} onClose={() => setVisible(false)}>
            <Actionsheet.Content bg={colors.white} px={`${scale(16)}px`}>
                <ScrollView w='full' showsVerticalScrollIndicator={false}>
                    <Text color={colors.dark} fontSize='18px' fontWeight='bold' textAlign='center' mb='12px'>
                        Sản phẩm đã chọn
                    </Text>
                    <HStack pb={`${vScale(12)}px`} borderBottomWidth={1} borderColor={colors.btnHeader}>
                        <Lightbox style={styles.lightbox} underlayColor={colors.white}>
                            <Image
                                // useFastImage
                                style={styles.image}
                                source={{
                                    uri: 'https://picsum.photos/500',
                                }}
                            />
                        </Lightbox>
                        <Box ml='32px' w={`${scale(230)}px`}>
                            <Text fontSize='14px' color={colors.darkFiord}>
                                {title}
                            </Text>
                            <Text fontSize='16px' color={colors.dark}>
                                Tôn xốp 3 lớp sóng ngói màu xanh dày 0.40mm
                            </Text>
                        </Box>
                    </HStack>
                    <HStack pt={`${vScale(15)}px`}>
                        <Text w={`${scale(80)}px`} color={colors.darkFiord} fontSize='14px'>
                            Giá
                        </Text>
                        <Text w={`${scale(230)}px`} ml='32px' fontSize='16px' fontWeight='bold' color={colors.blue}>
                            {numeral(price || 0).format()} VND/đơn vị
                        </Text>
                    </HStack>
                    <HStack
                        alignItems='center'
                        justifyContent='space-between'
                        mt={`${vScale(40)}px`}
                        mb={`${vScale(18)}px`}
                    >
                        <Divider my='1' w='35%' bg={colors.btnHeader} />
                        <Text fontSize={18} fontWeight='bold'>
                            {title}
                        </Text>
                        <Divider my='1' w='35%' bg={colors.btnHeader} />
                    </HStack>
                    <Box>
                        {options &&
                            Object.entries(options).filter((option: any) => {
                                const idsSelected = Object.values(valueSelect).map(v => v);
                                for (const key in idsSelected) {
                                    if (idsSelected) {
                                        idsSelected.push(_.take(idsSelected, Number(key) + 1).join("-"));
                                    }
                                }
                                // const joinSelected = idsSelected.length > 1 ? [...idsSelected, idsSelected.join('-')] : [...idsSelected];
                                const allParents = _.union(_.flatten(option[1].map((v: any) => v?.parent)));
                                const isChildren = _.intersection(_.union(idsSelected), allParents).length > 0;
                                return isChildren || option[1].filter((opt: any) => !opt?.parent).length > 0;
                            }).map((option: any, i) => {
                                const titleOption = option[0];
                                const dataOption = option[1];
                                const isShowFieldUpload = selectedData ? selectedData[titleOption] === 'pk-theo-hinh-ve' : false;
                                return (
                                    <>
                                        <Box key={i} mb={`${vScale(24)}px`}>
                                            <Text fontSize={18} fontWeight='bold' mb={`${vScale(16)}px`}>
                                                {getLabelByTypeValue(titleOption)}
                                            </Text>
                                            {Array.isArray(dataOption) && dataOption.length > 0 && (
                                                <Radio.Group
                                                    name='myRadioGroup'
                                                    value={valueSelect && valueSelect[titleOption]}
                                                    onChange={(val) => handleChangeValueSelect(titleOption, val)}
                                                >
                                                    <HStack flexWrap='wrap'>
                                                        {dataOption.map((item: any, index) => {
                                                            const idsSelected = Object.values(valueSelect).map(v => v);
                                                            for (const key in idsSelected) {
                                                                if (idsSelected) {
                                                                    idsSelected.push(_.take(idsSelected, Number(key) + 1).join("-"));
                                                                }
                                                            }
                                                            const isShow = item.parent && _.intersection(_.union(idsSelected), item.parent);
                                                            return isShow && isShow.length <= 0 ? null : item?.value ? (
                                                                <Touchable
                                                                    key={item.id}
                                                                    onPress={() =>
                                                                        handleChangeValueSelect(titleOption, item.id)
                                                                    }
                                                                    style={styles.selectColor}
                                                                >
                                                                    <VStack alignItems='center'>
                                                                        {item?.value?.image ? (
                                                                            <Image
                                                                                source={33}
                                                                                style={[
                                                                                    {
                                                                                        width: scale(45),
                                                                                        height: vScale(45),
                                                                                    },
                                                                                    valueSelect &&
                                                                                    valueSelect[titleOption] ===
                                                                                    item?.id &&
                                                                                    styles.colorActive,
                                                                                ]}
                                                                            />
                                                                        ) : (
                                                                            <Box
                                                                                bg={item?.value?.color}
                                                                                w={`${scale(45)}px`}
                                                                                h={`${vScale(45)}px`}
                                                                                borderRadius='40px'
                                                                                borderWidth={
                                                                                    valueSelect &&
                                                                                        valueSelect[titleOption] === item?.id
                                                                                        ? 2
                                                                                        : 0
                                                                                }
                                                                                borderColor={
                                                                                    valueSelect &&
                                                                                        valueSelect[titleOption] === item?.id
                                                                                        ? colors.blue
                                                                                        : 'transparent'
                                                                                }
                                                                            />
                                                                        )}

                                                                        <Text mt='8px' textAlign='center' noOfLines={2}>
                                                                            {item.title}
                                                                        </Text>
                                                                    </VStack>
                                                                </Touchable>
                                                            ) : (
                                                                <Radio
                                                                    value={item?.id}
                                                                    key={index}
                                                                    colorScheme='primary'
                                                                    w={dataOption.length < 6 ? '50%' : '33%'}
                                                                    justifyContent='flex-start'
                                                                    alignItems='flex-start'
                                                                    mb={`${vScale(1)}px`}
                                                                >
                                                                    <Text
                                                                        noOfLines={2}
                                                                        color={colors.dark}
                                                                        fontSize='16px'
                                                                        ml='8px'
                                                                        w='80px'
                                                                    >
                                                                        {item?.title}
                                                                    </Text>
                                                                </Radio>
                                                            )
                                                        }
                                                        )}
                                                    </HStack>
                                                </Radio.Group>
                                            )}
                                        </Box>
                                        {isShowFieldUpload && (
                                            <Box mb={`${scale(24)}px`}>
                                                <Text color={colors.darkFiord} fontSize={14} pb='4px'>Upload hình ảnh</Text>
                                                {imagesUpload.length > 0 ? (
                                                    <HStack
                                                    >
                                                        {imagesUpload.map((url, index) => (
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
                                                        {imagesUpload.length < 4 && (
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
                                                    <Touchable style={styles.uploadField} onPress={handlePickerImage}>
                                                        <HStack alignItems='center' h='full' justifyContent='space-between' px={`${scale(10)}px`}>
                                                            <Text color={colors.textHolderInput} fontSize={16}>Chọn hình ảnh từ thiết bị của bạn</Text>
                                                            <IconF name='upload' color={colors.blue} size={18} />
                                                        </HStack>
                                                    </Touchable>
                                                )}
                                            </Box>
                                        )}
                                    </>
                                )
                            })}
                    </Box>
                </ScrollView>
                <Button title='Lựa chọn' h='48px' w='full' onPress={onPress} />
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default React.memo(forwardRef(BottomSheetCalculate));

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    lightbox: {
        // flex: 1,
        height: vScale(80),
        width: scale(80),
    },
    colorActive: {
        borderColor: themes.colors.blue,
        borderWidth: 3,
        borderRadius: 40,
    },
    selectColor: {
        marginBottom: 0,
        width: '20%',
        paddingHorizontal: 12,
    },
    uploadField: {
        height: vScale(40),
        flex: 1,
        backgroundColor: themes.colors.holderInput
    },
    ContainerImageUpload: {
        height: scale(80),
        width: scale(80),
    },
    imageUpload: {
        height: '100%',
        width: '100%',
    },
    removeImageIcon: {
        position: 'absolute',
        top: 1,
        right: 1,
    },
});
