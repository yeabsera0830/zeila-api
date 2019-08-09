import { Alert, LinkingIOS, Platform } from 'react-native';
import { IntentLauncherAndroid as IntentLauncher } from 'expo';
import { Toast } from '../components/common/Toast';
import { getGeolocation, isLocationEnabled, requestPermissions } from '../../core/useCases/nearby';
import state from '../../core/states/nearby';
import strings from '../../common/values/strings';

const promptEnableLocation = (successCallback) => {
    Alert.alert(strings.location, strings.appWantsToEnableLocation, [
        {
            text: strings.cancel,
            onPress: () => { }
        },
        {
            text: strings.ok,
            onPress: async () => {
                if (Platform.OS === 'android') {
                    await IntentLauncher.startActivityAsync(
                        IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
                    if (await isLocationEnabled())
                        successCallback();
                } else {
                    LinkingIOS.openURL('app-settings:');
                    // then do sth
                }
            }
        },
    ], { cancelable: false });
};

export const getLocation = async () => {
    if (state.location.isLoading) {
        Toast.show(strings.waitUntilLocated);
        return;
    }
    if (!(await requestPermissions()))
        return;
    if (await isLocationEnabled()) {
        Toast.show(strings.locating);
        await getGeolocation();
        return;
    }
    promptEnableLocation(async () => {
        Toast.show(strings.locating);
        await getGeolocation();
    });
};