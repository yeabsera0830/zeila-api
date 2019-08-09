import { Facebook, Permissions, SecureStore } from 'expo';
import { sendAuthRequest, sendMediaUploadRequest } from './Networking';
import { Credential } from '../entities';
import state from '../states/auth';
import nearbyState from '../states/nearby';
import searchState from '../states/search';
import suggestionsState from '../states/suggestions';
import strings from '../../common/values/strings';
import links from '../../core/values/links';
import types from './types';

export const signupWithFb = async () => {
    let response = await connectWithFb();
    const { status, token, message } = response;
    if (status === types.SUCCESS) {
        response = await requestSignup({ type: types.SIGNUP_WITH_FB, token });
        if (response.status === types.SUCCESS) {
            await saveAccessTokenOnDevice(response.accessToken);
            return getSignupSuccessResponse();
        }
        return getSignupFailureResponse(response.message);
    }
    return getSignupFailureResponse(message);
};

export const loginWithFb = async () => {
    let response = await connectWithFb();
    const { status, token, message } = response;
    if (status === types.SUCCESS) {
        response = await requestLogin({ type: types.LOGIN_WITH_FB, token });
        if (response.status === types.SUCCESS) {
            await saveAccessTokenOnDevice(response.accessToken);
            return getLoginSuccessResponse();
        }
        return getLoginFailureResponse(response.message);
    }
    return getLoginFailureResponse(message);
};

const connectWithFb = async () => {
    try {
        const { token } = await Facebook.logInWithReadPermissionsAsync(
            strings.FACEBOOK_ID, { permissions: ['email', 'public_profile'] });
        return { status: types.SUCCESS, token };
    } catch ({ message }) {
        return { status: types.FAILURE, message };
    }
};

export const signup = async (phoneNumber, password, confirmPassword) => {
    if (password !== confirmPassword)
        return getSignupFailureResponse(strings.incorrectConfirmPassword);
    const credential = new Credential(phoneNumber, password);
    if (!credential.isEligiblePassword())
        return getSignupFailureResponse(strings.ineligiblePassword);
    const response = await requestSignup({ type: types.SIGNUP, credential });
    if (response.status === types.SUCCESS) {
        await saveAccessTokenOnDevice(response.accessToken);
        return getSignupSuccessResponse();
    }
    return getSignupFailureResponse(response.message);
};

export const login = async (phoneNumber, password) => {
    const credential = new Credential(phoneNumber, password);
    const response = await requestLogin({ type: types.LOGIN, credential });
    if (response.status === types.SUCCESS) {
        await saveAccessTokenOnDevice(response.accessToken);
        return getLoginSuccessResponse();
    }
    return getLoginFailureResponse(response.message);
};

const requestSignup = async (request) => {
    const link = request.type === types.SIGNUP_WITH_FB ? links.signUpWithFacebook : links.signUpWithPhone;
    const params = request.type === types.SIGNUP_WITH_FB ? {
        facebookToken: request.token
    } : {
            phoneNumber: request.credential.phoneNumber,
            password: request.credential.password
        };
    const { type, accessToken, message } = await sendAuthRequest(link, params);
    return type === types.SUCCESS ? { status: type, accessToken } : { status: type, message };
};

const requestLogin = async (request) => {
    const link = request.type === types.LOGIN_WITH_FB ? links.loginWithFacebook : links.loginWithPhone;
    const params = request.type === types.LOGIN_WITH_FB ? {
        facebookToken: request.token
    } : {
            phoneNumber: request.credential.phoneNumber,
            password: request.credential.password
        };
    const { type, accessToken, message } = await sendAuthRequest(link, params);
    return type === types.SUCCESS ? { status: type, accessToken } : { status: type, message };
};

export const saveAccessTokenOnDevice = async (token) => {
    await SecureStore.setItemAsync(strings.ACCESS_TOKEN_STORAGE_KEY, token);
    state.isAuthenticated = true;
};

const getSignupSuccessResponse = () => {
    return { status: types.SUCCESS };
};

const getSignupFailureResponse = message => {
    return { status: types.FAILURE, message };
};

const getLoginSuccessResponse = () => {
    return { status: types.SUCCESS };
};

const getLoginFailureResponse = message => {
    return { status: types.FAILURE, message };
};

export const isLoggedIn = async () => {
    const accessToken = await SecureStore.getItemAsync(strings.ACCESS_TOKEN_STORAGE_KEY);
    return !!accessToken;
};

export const logout = async () => {
    await clearAccessTokenFromDevice();
    clearAllStates();
};

const clearAccessTokenFromDevice = async () => {
    await SecureStore.deleteItemAsync(strings.ACCESS_TOKEN_STORAGE_KEY);
    state.isAuthenticated = false;
};

const clearAllStates = () => {
    nearbyState.reset();
    searchState.reset();
    suggestionsState.reset();
};

export const getAccessTokenFromDevice = async () => {
    const accessToken = await SecureStore.getItemAsync(strings.ACCESS_TOKEN_STORAGE_KEY);
    return accessToken;
};

export const saveBasicInfo = async (name, profilePicture) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', { name: 'profile.jpg', type: 'image/jpeg', uri: profilePicture });
    const { type, message } = await sendMediaUploadRequest(links.saveBasicInfo, formData);
    return type === types.SUCCESS ? { type } : { type, message };
};

export const requestCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    return status === 'granted';
};