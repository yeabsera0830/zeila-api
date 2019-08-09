import { Platform, ToastAndroid } from 'react-native';

const Toast = {
    show(message, duration) {
        if (!message)
            return;
        if (Platform.OS === 'android')
            ToastAndroid.show(message, duration === ToastAndroid.LONG ? ToastAndroid.LONG : ToastAndroid.SHORT);
        // else implement for iOS
    },
    LONG: ToastAndroid.LONG
};

export { Toast };