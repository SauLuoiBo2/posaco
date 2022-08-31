import { StyleSheet } from 'react-native';
import React, { forwardRef, useState } from 'react';
import { Box, Select, Text, useTheme } from 'native-base';
import { Button, Icon, scale, vScale } from '@src/components';
import { themes } from '@src/utils';


type Props = {
    setIsShowFilterSheet: (arg0: any) => void;
    dataFilter: any[];
};

const AdvancedFilter = ({ setIsShowFilterSheet, dataFilter }: Props) => {
    const { colors, fonts } = useTheme();
    const [visible, setVisible] = useState(false);
    const [service, setService] = React.useState(dataFilter[0]?.value);

    return (
        <Box pt={`${vScale(18)}px`} w='100%'>
            <Text
                px={`${scale(16)}px`}
                mb='16px'
                fontSize='18px'
                color={colors.dark}
                fontWeight='bold'
                fontFamily={fonts.hBold}
            >
                Bộ lọc nâng cao
            </Text>
            <Box px={`${scale(16)}px`}>
                <Select
                    selectedValue={service}
                    bg={colors.light}
                    borderWidth={0}
                    fontSize='16px'
                    borderRadius={0}
                    px={`${scale(16)}px`}
                    dropdownIcon={
                        <Box mr={`${scale(16)}px`}>
                            <Icon name='arrow-down' color={colors.blue} size={17} />
                        </Box>
                    }
                    _selectedItem={{
                        _text: {
                            color: colors.black,
                            fontWeight: 'bold',
                        },
                        endIcon: (
                            <Box>
                                <Icon name='check' color={colors.green} size={22} ml />
                            </Box>
                        ),
                        justifyContent: 'space-between',
                    }}
                    _item={{
                        _text: {
                            color: colors.blue,
                            w: '100%',
                        },
                        borderBottomWidth: 1,
                        borderColor: colors.light,
                        justifyContent: 'space-between',
                    }}
                    _actionSheetContent={{
                        bg: colors.white,
                    }}
                    accessibilityLabel='Choose Service'
                    placeholder='Choose Service'
                    style={styles.menu}
                    mt={1}
                    onValueChange={(itemValue) => setService(itemValue)}
                >
                    {dataFilter &&
                        dataFilter.length > 0 &&
                        dataFilter.map((v) => <Select.Item label={v?.label} value={v?.value} />)}
                </Select>
            </Box>
            <Box px={`${scale(16)}px`} mt={`${vScale(32)}px`}>
                <Button
                    title='Áp dụng bộ lọc'
                    _text={{ fontSize: 16 }}
                    h={`${vScale(48)}px`}
                    onPress={() => setIsShowFilterSheet(false)}
                />
            </Box>
        </Box>
    );
};

export default React.memo(forwardRef(AdvancedFilter));

const styles = StyleSheet.create({
    menu: {
        width: '100%',
        backgroundColor: themes.colors.light,
        height: vScale(40),
        justifyContent: 'center',
        paddingHorizontal: scale(16),
    },
});
