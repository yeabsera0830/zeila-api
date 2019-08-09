import { Location } from 'expo';
import { sendRequest } from './Networking';
import state from '../states/nearby';
import links from '../values/links';
import types from './types';
import { sleep } from '../helpers';
import strings from '../../common/values/strings';

export const getGeolocation = async () => {
    state.location.isLoading = true;
    const location = await getLocation();
    state.location.isLoading = false;
    if (location)
        state.location.value = location;
    return location ? { type: types.SUCCESS, location } : { type: types.FAILURE, message: strings.unableToLocate };
};

const getLocation = async () => {
    let locationHighest, locationHigh, locationBalanced;
    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
        .then(location => { locationHighest = location.coords; });
    setTimeout(() => {
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
            .then(location => { locationHigh = location.coords; });
    }, 15000);
    setTimeout(() => {
        Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
            .then(location => { locationBalanced = location.coords; });
    }, 20000);
    for (let i = 0; i < 30; i++) {
        await sleep(1000);
        if (locationHighest)
            return locationHighest;
        else if (i > 15 && locationHigh)
            return locationHigh;
    }
    return locationBalanced;
};

export const getReadableAddress = async (location) => {
    const { type, address, message } = await sendRequest(links.getReadableAddress, { location });
    return type === types.SUCCESS ? { type, address } : { type, message };
};

export const isLocationEnabled = async () => await Location.hasServicesEnabledAsync();

export const requestPermissions = async () => {
    try {
        await Location.requestPermissionsAsync();
        return true;
    } catch (err) {
        return false;
    }
};

export const getTrendingPlaces = async (startIndex, finishIndex) => {
    const { type, places, message } = await sendRequest(links.getTrendingPlaces, { startIndex, finishIndex });
    return type === types.SUCCESS ? { type, places } : { type, message };
};

export const getNearbyPlaces = async () => {
    const { type, places, message } = await sendRequest(links.getNearbyPlaces, { location: state.location.value });
    return type === types.SUCCESS ? { type, places } : { type, message };
};

export const getNewPlaces = async (startIndex, finishIndex, location) => {
    const { type, places, message } = await sendRequest(links.getNewPlaces, { startIndex, finishIndex, location });
    return type === types.SUCCESS ? { type, places } : { type, message };
};