import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, Button, Input, Text, TextArea, useTheme } from 'native-base';
import { themes } from '@src/utils';
import { InputToolbar, Send, Composer } from 'react-native-gifted-chat';
import logger from '@src/utils/common/logger';

import { scale, vScale } from '../ScaleSheet';
import { Icon } from '../Icon';

const InputGiftedChat = (props: any) => {
    const { colors } = useTheme();
    logger.debug('props', props);
    return (
        <Box position='relative' bg={colors.white} px={`${scale(16)}`} pt={`${vScale(8)}`} style={styles.shadow}>
            <Box>
                <InputToolbar
                    {...props}
                    containerStyle={styles.input}
                    renderSend={() => (
                        <Send {...props} alwaysShowSend containerStyle={styles.send}>
                            <Icon name='send' color={colors.lightGrey} size={24} />
                        </Send>
                    )}
                    renderComposer={() => <Composer {...props} />}
                />
            </Box>
        </Box>
    );
};

export default React.memo(InputGiftedChat);

const styles = StyleSheet.create({
    shadow: {
        // paddingBottom: vScale(26),
        // backgroundColor: 'red',
        shadowColor: themes.colors.darkNeu,
        // shadowRadius: 10,
        // shadowOpacity: 0.6,
        // elevation: 8,
        // shadowOffset: {
        //     width: 0,
        //     height: vScale(8),
        // },
    },
    input: {
        backgroundColor: themes.colors.light,
        position: 'relative',
        height: 40,
        borderTopWidth: 0,
        borderRadius: 8,
        fontSize: 20,
    },
    send: {
        height: 30,
        marginBottom: 12,
        marginRight: 8,
    },
});
