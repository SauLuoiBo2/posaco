import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { putFCMToken } from 'src/store/actions';
import deviceType from 'src/constants/devices';

const showNotification = (notification, navigation) => {
    PushNotification.configure({
        onNotification(notifications) {
            if (notifications.userInteraction) {
                if (notifications.data.type === 'ORDER') {
                    navigation.navigate('OrderDetailScreen', {
                        payload: notifications.data._id,
                    });
                } else {
                    navigation.navigate('NotificationDetailScreen', {
                        payload: notifications.data._id,
                    });
                }
            }
        },
    });

    PushNotification.localNotification({
        title: notification.data.title,
        message: notification.data.body,
        data: notification.data,
    });
};

const onOpenNotification = (notification, navigation) => {
    if (notification.data.type === 'ORDER') {
        console.log('order');
        navigation.navigate('OrderDetailScreen', {
            payload: notification.data._id,
        });
    } else {
        navigation.navigate('NotificationDetailScreen', {
            payload: notification.data._id,
        });
    }
};

function FCMService({ navigation }) {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);

    React.useEffect(() => {
        messaging()
            .getToken()
            .then((token) => {
                console.log('FCMToken:>>', token);
                dispatch(
                    putFCMToken(
                        {
                            deviceId: deviceType.deviceId,
                            deviceType: deviceType.deviceType,
                            deviceToken: token,
                        },
                        accessToken
                    )
                );
            });

        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('onOpenNotification');
            onOpenNotification(remoteMessage, navigation);
        });

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    console.log('Notification caused app to open from quit state:', remoteMessage);
                    onOpenNotification(remoteMessage, navigation);
                }
            });

        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            console.log('on app!', remoteMessage);
            showNotification(remoteMessage, navigation);
        });

        return unsubscribe;
    }, []);

    return null;
}

export default FCMService;
