import { StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';
import { Box, Text, useTheme } from 'native-base';
import { HeaderBar, InputForm, InputGiftedChat } from '@src/components';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';
import logger from '@src/utils/common/logger';

const PersonalMessageComponent = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [messages, setMessages] = useState<any>([]);
    logger.debug('messgae', messages);

    logger.debug('gifted', GiftedChat);

    useEffect(() => {
        setMessages([
            {
                _id: 2,
                text: 'Cám ơn bạn hanvietanhh đã liên hệ đến Poshaco. Mình là Tân xin được hỗ trợ bạn ạ.',
                createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                user: {
                    _id: 1,
                    name: 'Poshaco',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 1,
                text: 'Chào bạn mình muốn hỗ trợ về tình trạng đơn hàng',
                createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                user: {
                    _id: 2,
                    name: 'Poshaco',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((message: any = []) => {
        setMessages((previousMessages: any) => GiftedChat.append(previousMessages, message));
    }, []);

    return (
        <Box safeArea bg={colors.white} flex={1}>
            <HeaderBar title='Hỗ trợ viên' navigation={navigation} pb='15px' />
            <Box flex={1} bg={colors.light}>
                <GiftedChat
                    messages={messages}
                    onSend={(msg) => onSend(msg)}
                    user={{
                        _id: 1,
                    }}
                    renderInputToolbar={(props) => <InputGiftedChat {...props} />}
                    placeholder='Nhập tin nhắn của bạn'
                />
            </Box>
        </Box>
    );
};

export const PersonalMessageScreen = React.memo(PersonalMessageComponent, (prevProps, nextProps) =>
    isEqual(prevProps, nextProps)
);

const styles = StyleSheet.create({});
