import React, { useState } from 'react';
import { Box, HStack, Modal, Radio, ScrollView, Text, useTheme, VStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { themes } from '@src/utils';
import logger from '@src/utils/common/logger';

import Touchable from '../Touchable';
import { scale, vScale } from '../ScaleSheet';
import { Icon } from '../Icon';
import ButtonCustom from '../Button';
import { Image } from '..';

const dataSelect = ['Tôn 3 lớp', 'Tôn 3 lớp', 'Tôn 4 lớp', 'Tôn 5 lớp'];

const InputDropDown = ({ value, data, label, placeholder, stylesContent, type = 'list', onPress, ...rest }: any) => {
    const { colors, fonts } = useTheme();
    const [visible, setVisible] = useState(false);
    // const [value, setValue] = useState('');

    const [valueSelect, setValueSeclect] = useState<any>(null);

    const colorText = value ? styles.textActive : styles.textDefault;
    const valueText = value || placeholder;

    const handleSetValue = (item: any) => {
        // setValue(item?.value);
        setVisible(false);
    };

    const ModalSelect = () => (
        <Modal zIndex={50} animationPreset='slide' isOpen={visible} onClose={() => setVisible(false)}>
            <Modal.Content
                marginBottom='0'
                marginTop='auto'
                px={`${scale(16)}px`}
                pt='16px'
                borderRadius={0}
                width='full'
                borderTopRadius={5}
                pb={`${vScale(34)}px`}
            >
                <Text color={colors.black} fontSize='18px' fontWeight='bold' fontFamily={fonts.hBold} mb='16px'>
                    {`Chọn ${label.toLowerCase()}`}
                </Text>
                <Box mb='24px'>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {data && Array.isArray(data) && data.length > 0 && type === 'list' ? (
                            data.map((item: any, index) => (
                                <Touchable key={index} style={styles.selectItem} onPress={() => handleSetValue(item)}>
                                    <Text borderBottomWidth={1} fontSize='16px' color={colors.dark}>
                                        {item.value}
                                    </Text>
                                </Touchable>
                            ))
                        ) : type === 'flex' ? (
                            <Radio.Group name='myRadioGroup'>
                                <HStack flexWrap='wrap' mx='-13px'>
                                    {data.map((item: any) =>
                                        item?.color ? (
                                            <Touchable
                                                key={item.id}
                                                onPress={() => setValueSeclect(item.id)}
                                                style={styles.selectColor}
                                            >
                                                <VStack alignItems='center'>
                                                    {item?.image ? (
                                                        <Image
                                                            source={item?.image}
                                                            style={[
                                                                { width: scale(45), height: vScale(45) },
                                                                valueSelect === item?.id && styles.colorActive,
                                                            ]}
                                                        />
                                                    ) : (
                                                        <Box
                                                            bg={item?.color}
                                                            w={`${scale(45)}px`}
                                                            h={`${vScale(45)}px`}
                                                            borderRadius='40px'
                                                            borderWidth={valueSelect === item?.id ? 2 : 0}
                                                            borderColor={
                                                                valueSelect === item?.id ? colors.blue : 'transparent'
                                                            }
                                                        />
                                                    )}

                                                    <Text mt='8px' noOfLines={2}>
                                                        {item.value}
                                                    </Text>
                                                </VStack>
                                            </Touchable>
                                        ) : (
                                            <Radio
                                                value={item.value}
                                                key={item.id}
                                                colorScheme='primary'
                                                w='150px'
                                                justifyContent='flex-start'
                                            >
                                                {item.value}
                                            </Radio>
                                        )
                                    )}
                                </HStack>
                            </Radio.Group>
                        ) : null}
                    </ScrollView>
                </Box>
                <ButtonCustom title='Tiếp theo' onPress={() => setVisible(false)} h='48px' />
            </Modal.Content>
        </Modal>
    );

    return (
        <Box px={`${scale(16)}px`} style={[stylesContent]} {...rest}>
            {label && (
                <Text fontSize='16px' fontFamily='hRegular' mb='4px'>
                    {label}
                </Text>
            )}
            <Touchable style={[styles.wrapper, stylesContent]} onPress={onPress}>
                <HStack>
                    <Text numberOfLines={1} style={colorText} fontSize='16px'>
                        {valueText}
                    </Text>
                    <Touchable style={styles.btnIcon} onPress={onPress}>
                        <Icon name='arrow-down' color={colors.blue} size={20} />
                    </Touchable>
                </HStack>
            </Touchable>
            {/* <ModalSelect /> */}
        </Box>
    );
};

export default React.memo(InputDropDown);

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        paddingLeft: scale(12),
        paddingRight: scale(12),
        backgroundColor: themes.colors.light,
        height: vScale(40),
        width: scale(343),
        borderColor: themes.colors.blue,
        borderRadius: 2,
        marginTop: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    textDefault: {
        color: themes.colors.textHolderInput,
        fontFamily: themes.fonts.hRegular,
        flexWrap: 'wrap',
        flex: 1,
    },
    textActive: {
        color: themes.colors.dark,
        fontFamily: themes.fonts.hMedium,
        flexWrap: 'wrap',
        flex: 1,
    },
    btnIcon: {
        // width: '100%',
        // height: '100%',
        marginLeft: scale(10),
        justifyContent: 'center',
        alignItems: 'flex-end',
        // paddingRight: scale(12),
    },
    selectItem: {
        height: vScale(45),
        borderColor: themes.colors.darkGray14,
        borderBottomWidth: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    selectColor: {
        marginBottom: 24,
        width: '20%',
        paddingHorizontal: 12,
    },
    colorActive: {
        borderColor: themes.colors.blue,
        borderWidth: 2,
        borderRadius: 40,
    },
});
