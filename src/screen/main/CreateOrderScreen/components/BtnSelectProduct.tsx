import { StyleSheet } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, HStack, Text } from 'native-base';
import { scale, Touchable, vScale } from '@src/components';
import { themes } from '@src/utils';

type Props = {
    data: any;
};

const BtnSelectProduct = ({ data }: Props, ref: any) => {
    const [checked, setChecked] = useState(data[0]?.id);

    const handleChecked = (id: number) => {
        if (id !== checked) {
            setChecked(id);
        }
    };

    useImperativeHandle(
        ref,
        () => ({
            getProductData: () => data.find(({ id }: any) => id === checked),
        }),
        [checked]
    );

    return (
        <HStack flexWrap='wrap' justifyContent='flex-start' mx={`-${scale(5)}px`}>
            {data.map(({ title, id }: any, index: number) => {
                const styleBtn = checked === id ? styles.btnLabelActive : styles.btnLabel;
                const styleText = checked === id ? styles.btnTextBlue : styles.btnTextGray;
                return (
                    <Box w={`${(1 / 3) * 100}%`} px={`${scale(5)}px`}>
                        <Touchable
                            key={index}
                            style={[styles.btnLabelDefault, styleBtn]}
                            onPress={() => handleChecked(id)}
                        >
                            <Text fontFamily={themes.fonts.hMedium} fontSize='16px' style={styleText}>
                                {title}
                            </Text>
                        </Touchable>
                    </Box>
                );
            })}
        </HStack>
    );
};

export default React.memo(forwardRef(BtnSelectProduct));

const styles = StyleSheet.create({
    btnLabelDefault: {
        // flex: 3,
        // width: `${(1 / 3) * 100}%`,
        height: vScale(64),
        fontFamily: themes.fonts.hBold,
        marginBottom: vScale(9),
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: scale(9),
    },
    btnLabelActive: {
        borderColor: themes.colors.blueTory,
    },
    btnLabel: {
        borderColor: themes.colors.lightGrey,
    },
    btnTextGray: {
        color: themes.colors.black,
    },
    btnTextBlue: {
        color: themes.colors.blueTory,
        fontFamily: themes.fonts.hBold,
    },
});
