import Swipeable from 'react-native-gesture-handler/Swipeable';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Text, useTheme, Center, Box } from 'native-base';
import React, { useRef } from 'react';
import { Icon, scale, Touchable, vScale } from '@src/components';
import moment from 'moment';
import RenderHtml, { TChildrenRenderer } from 'react-native-render-html';
import { themes } from '@src/utils';
import logger from '@src/utils/common/logger';

const NotificationItem = ({ onPress, notification, onOpen, onClose, removeItem, index }: any) => {
    const rowRef = useRef(null);
    const { colors, fonts } = useTheme();
    let isOpened = false;

    const { width } = useWindowDimensions();

    const renderIcon = (type: string) => {
        if (type === 'ORDER') {
            return 'delivery';
        }
        if (type === 'DISCOUNT') {
            return 'discount';
        }
        return 'news';
    };

    const renderLeftActions = () => (
        <Touchable style={styles.leftAction} onPress={() => removeItem(rowRef)}>
            <Icon name='trash' size={30} color={colors.white} />
        </Touchable>
    );

    const onSwipeOpen = () => {
        if (!isOpened) {
            isOpened = true;
            onOpen(rowRef);
        }
    };

    const onSwipeClose = () => {
        if (isOpened) {
            isOpened = false;
            onClose(rowRef);
        }
    };

    const read = notification.seen;
    const bgNotification = read ? styles.bgRead : styles.bgUnRead;
    const bgIcon = read ? styles.bgIconRead : styles.bgIconUnRead;
    const colorIcon = read ? colors.darkNeu : colors.green;
    return (
        <Swipeable
            key={index}
            ref={rowRef}
            onSwipeableOpen={onSwipeOpen}
            onSwipeableClose={onSwipeClose}
            renderLeftActions={renderLeftActions}
        >
            <Touchable onPress={onPress} style={[styles.content, bgNotification]}>
                <>
                    <Center style={[styles.icon, bgIcon]}>
                        <Icon name={renderIcon(notification.type)} color={colorIcon} size={25} />
                    </Center>
                    <Box px={3} py={3} style={styles.contentRight}>
                        <Text fontSize={16} color={colors.blue} fontFamily={fonts.hMedium} noOfLines={1}>
                            {notification.title}
                        </Text>

                        <RenderHtml
                            contentWidth={width}
                            source={{ html: `<article>${notification.description}</article>` }}
                            renderers={{
                                p: ({ tnode }: any) => (
                                    <Text key={index} noOfLines={1}>
                                        <TChildrenRenderer tchildren={tnode.children} />
                                    </Text>
                                ),
                            }}
                        />
                        <Text color={colors.darkNeu} fontFamily={fonts.hMedium} mt={2}>
                            {moment(notification.createdAt * 1000).fromNow()}
                        </Text>
                    </Box>
                </>
            </Touchable>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingLeft: scale(16),
        flexDirection: 'row',
    },
    contentRight: {
        flex: 1,
        padding: vScale(12),
        borderColor: themes.colors.white1,
        borderBottomWidth: 1,
        marginLeft: vScale(10),
    },
    bgRead: {
        backgroundColor: themes.colors.white,
    },
    bgUnRead: {
        backgroundColor: themes.colors.light,
    },
    icon: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        alignSelf: 'flex-start',
        marginTop: vScale(12),
    },
    bgIconRead: {
        backgroundColor: themes.colors.darkNeu20,
    },
    bgIconUnRead: {
        backgroundColor: themes.colors.green20,
    },
    leftAction: {
        width: scale(64),
        height: '100%',
        backgroundColor: themes.colors.red61,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default React.memo(NotificationItem);
