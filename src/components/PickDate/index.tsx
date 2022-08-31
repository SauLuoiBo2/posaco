import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Box, Text, useTheme } from 'native-base';
import moment from 'moment';

import Touchable from '../Touchable';
import { scale, vScale } from '../ScaleSheet';
import { themes } from '@src/utils';
import { Icon } from '../Icon';

const PickDate = ({ startDate, endDate, onPress, showIcon = true, styleBtnDate, styleDate, styleContent }: any) => {
    const { colors, fonts } = useTheme();
    return (
        <Touchable style={[styleBtnDate, styles.btnDate]} onPress={onPress}>
            <>
                <Box
                    bg={colors.light}
                    h={`${vScale(40)}px`}
                    w={`${scale(287)}px`}
                    justifyContent='center'
                    style={[styleDate]}>
                    {!startDate ? (
                        <Text fontFamily={fonts.hMedium} color={colors.darkNeu} fontSize='16px'>
                            Thời gian
                        </Text>
                    ) : (
                        <Text fontFamily={fonts.hMedium} color={colors.darkNeu} fontSize='16px' style={styleContent}>
                            {`Từ `}
                            <Text fontSize='16px' fontFamily={fonts.hMedium} style={styleContent}>
                                {moment(startDate * 1000).format('DD/MM/YYYY')}
                            </Text>
                            {endDate ? (
                                <Text
                                    fontFamily={fonts.hMedium}
                                    color={colors.darkNeu}
                                    fontSize='16px'
                                    style={styleContent}
                                >
                                    {` đến `}
                                    <Text fontSize='16px' fontFamily={fonts.hMedium} style={styleContent}>
                                        {moment(endDate * 1000).format('DD/MM/YYYY')}
                                    </Text>
                                </Text>
                            ) : null}
                        </Text>
                    )}
                </Box>
                {showIcon ? <Icon name={'calendar'} size={25} color={themes.colors.darkNeu} /> : null}
            </>
        </Touchable>
    );
};

export default React.memo(PickDate);

const styles = StyleSheet.create({
    btnDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: vScale(10),
    },
});
