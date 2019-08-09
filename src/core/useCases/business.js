import { Permissions } from 'expo';
import { sendRequest, sendMediaUploadRequest } from './Networking';
import types from './types';
import links from '../values/links';
import { sleep } from '../helpers';

export const getBusinessProfile = async (id, numberOfPhotos, numberOfReviews) => {
    const { type, profile, message } =
        await sendRequest(links.getBusinessProfile, { id, numberOfPhotos, numberOfReviews });
    return type === types.SUCCESS ? { type, profile } : { type, message };
};

export const addToBookmarks = async (id) => {
    const { type, message } = await sendRequest(links.addToBookmarks, { id });
    return type === types.SUCCESS ? { type } : { message };
};

export const removeFromBookmarks = async (id) => {
    const { type, message } = await sendRequest(links.removeFromBookmarks, { id });
    return type === types.SUCCESS ? { type } : { message };
};

export const rateBusiness = async (id, rating) => {
    const { type, newRating, message } = await sendRequest(links.rateBusiness, { id, rating });
    return type === types.SUCCESS ? { type, newRating } : { type, message };
};

export const reviewBusiness = async (id, text) => {
    const { type, reviewID, message } = await sendRequest(links.reviewBusiness, { id, text });
    return type === types.SUCCESS ? { type, reviewID } : { type, message };
};

export const uploadPhoto = async (id, uri) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('photo', { name: 'photo.jpg', type: 'image/jpeg', uri });
    const { type, message } = await sendMediaUploadRequest(links.uploadPhoto, formData);
    return type === types.SUCCESS ? { type } : { type, message };
};

export const requestCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    return status === 'granted';
};