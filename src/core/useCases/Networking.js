import { getAccessTokenFromDevice } from './auth';
import types from './types';
import strings from '../../common/values/strings';

const APP_SECRET = require('../../../app.json').app.appSecret;

export const sendRequest = async (url, params, queries) => {
    const accessToken = await getAccessTokenFromDevice();
    return (await sendPostRequest(url, { ...params, accessToken }, queries));
};

export const sendAuthRequest = async (url, params, queries) => (await sendPostRequest(url, params, queries));

export const sendMediaUploadRequest = async (url, formData) => {
    const accessToken = await getAccessTokenFromDevice();
    const params = { accessToken, appSecret: APP_SECRET };
    Object.keys(params).forEach(key => formData.append(key, params[key]));
    return (await sendMultiPartFormDataRequest(url, formData));
};

const sendPostRequest = async (url, params, queries) => {
    const builtUrl = buildUrl(url, queries);
    try {
        const response = await fetch(builtUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...params, appSecret: APP_SECRET })
        });
        const json = await response.json();
        return (json.status === 200 ?
            { ...json, type: types.SUCCESS } :
            { type: types.FAILURE, message: json.message });
    } catch (err) {
        return { type: types.FAILURE, message: strings.networkConnectionProblem };
    }
};

const sendMultiPartFormDataRequest = async (url, formData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const json = await response.json();
        return (json.status === 200 ?
            { ...json, type: types.SUCCESS } :
            { type: types.FAILURE, message: json.message });
    } catch (err) {
        return { type: types.FAILURE, message: strings.operationFailed };
    }
};

const buildUrl = (url, queries) => {
    if (!queries)
        return url;
    const keys = Object.keys(queries);
    const mappedQueries = keys.map((value, index) => {
        const keyValueAssignment = `${encodeURIComponent(value)}=${encodeURIComponent(queries[value])}`;
        return `${index === 0 ? '?' : ''}${keyValueAssignment}`;
    });
    return url + mappedQueries.join('&');
};