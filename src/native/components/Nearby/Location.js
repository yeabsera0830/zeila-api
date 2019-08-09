import React, { Component, Fragment } from 'react';
import { Alert, LinkingIOS, Platform, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { IntentLauncherAndroid as IntentLauncher } from 'expo';
import { Icon, Toast } from '../common';
import {
    getGeolocation, getReadableAddress, isLocationEnabled, requestPermissions
} from '../../../core/useCases/nearby';
import coreState from '../../../core/states/nearby';
import coreMapViewState from '../../../core/states/mapView';
import strings from '../../../common/values/strings';
import types from '../../../core/useCases/types';
import icons from '../../values/icons';
import styles from './styles';

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: coreState.location.value,
            locationBadgeText: coreState.address.hasValue() ? this.formatReadableAddress(coreState.address.value) : '',
            isMapViewVisible: false
        };
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        if (!this.state.location)
            this.locateMe();
        else if (!this.state.locationBadgeText)
            this.getReadableAddress(coreState.location.value);
    }

    locateMe = () => {
        this.setState({ locationBadgeText: strings.locating });
        this.getGeolocation(({ type, location, message }) => {
            if (type === types.SUCCESS) {
                this.setState({ location });
                this.getReadableAddress(location);
            } else {
                Toast.show(message);
                this.setState({ locationBadgeText: '' });
            }
        });
    }

    getGeolocation = async (callback) => {
        let location;
        if (await requestPermissions()) {
            if (await isLocationEnabled()) {
                location = await getGeolocation();
                callback(location);
            } else {
                this.promptEnableLocation(async () => {
                    location = await getGeolocation();
                    callback(location);
                }, () => {
                    this.setState({ locationBadgeText: this.getLocationBadgeTextFallback() });
                });
            }
        } else {
            this.setState({ locationBadgeText: this.getLocationBadgeTextFallback() });
        }
    }

    promptEnableLocation = (successCallback, failureCallback) => {
        Alert.alert(strings.location, strings.appWantsToEnableLocation, [
            {
                text: strings.cancel,
                onPress: () => this.setState({ locationBadgeText: this.getLocationBadgeTextFallback() })
            },
            {
                text: strings.ok,
                onPress: async () => {
                    if (Platform.OS === 'android') {
                        await IntentLauncher.startActivityAsync(
                            IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
                        if (await isLocationEnabled())
                            successCallback();
                        else if (failureCallback)
                            failureCallback();
                    } else {
                        LinkingIOS.openURL('app-settings:');
                        // then do sth
                    }
                }
            },
        ], { cancelable: false });
    }

    getReadableAddress = async (location) => {
        const { type, address, message } = await getReadableAddress(location);
        if (type === types.SUCCESS) {
            this.setState({ locationBadgeText: this.formatReadableAddress(address) });
            coreState.address.value = address;
        } else {
            this.setState({ locationBadgeText: '' });
            Toast.show(message);
        }
    }

    formatReadableAddress = (address) => `${address.major}, ${address.minor}`

    locateMeManually = async () => {
        if (!(await requestPermissions()))
            return;
        if (await isLocationEnabled()) {
            coreMapViewState.type = coreMapViewState.types.MANUAL_LOCATION;
            coreMapViewState.manualLocation.onSet = this.onManualLocationSet;
            coreMapViewState.manualLocation.onCancel = this.onManualLocationCancel;
            coreMapViewState.isVisible.value = true;
        } else {
            this.promptEnableLocation(() => { coreMapViewState.isVisible.value = true; });
        }
    }

    onManualLocationSet = async (location) => {
        coreState.location.value = location;
        coreMapViewState.isVisible.value = false;
        this.setState({ location });
        this.getReadableAddress(location);
    }

    onManualLocationCancel = () => {
        coreMapViewState.isVisible.value = false;
    }

    getLocationBadgeTextFallback = () =>
        (coreState.address.hasValue() ? this.formatReadableAddress(coreState.address) : '')

    onRefreshLongPress = () => Toast.show(strings.refreshLocation)

    onLocateManuallyLongPress = () => Toast.show(strings.setLocationManually)

    render() {
        const { isVisible } = this.props;
        const { locationBadgeText } = this.state;
        return (
            <Fragment>
                {isVisible ? <Fragment>
                    <View style={styles.location.container}>
                        {locationBadgeText ? <Text style={styles.location.badge}>
                            {locationBadgeText}
                        </Text> : null}
                        <View style={styles.location.buttonsContainer}>
                            <TouchableOpacity onPress={this.locateMe} onLongPress={this.onRefreshLongPress}>
                                <Icon icon={icons.refresh} style={styles.location.button} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.locateMeManually}
                                onLongPress={this.onLocateManuallyLongPress}
                            >
                                <Icon icon={icons.locate} style={styles.location.button} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Fragment> : null}
            </Fragment>
        );
    }
}

export { Location };