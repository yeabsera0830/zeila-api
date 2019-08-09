import { sendRequest } from './Networking';
import links from '../values/links';
import types from './types';

export const getPerson = async (id) => {
    const { type, person, message } = await sendRequest(links.getPerson, { id });
    return type === types.SUCCESS ? { type, person } : { type, message };
};