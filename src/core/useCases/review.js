import { sendRequest } from './Networking';
import links from '../values/links';
import types from './types';

export const getReview = async (id) => {
    const { type, review, message } = await sendRequest(links.getReview, { id });
    return type === types.SUCCESS ? { type, review } : { type, message };
};

export const likeReview = async (id) => {
    const { type, newLikes, message } = await sendRequest(links.likeReview, { id });
    return type === types.SUCCESS ? { type, newLikes } : { type, message };
};

export const unlikeReview = async (id) => {
    const { type, newLikes, message } = await sendRequest(links.unlikeReview, { id });
    return type === types.SUCCESS ? { type, newLikes } : { type, message };
};