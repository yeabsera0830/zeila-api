import { sendRequest } from './Networking';
import nearbyState from '../states/nearby';
import searchState from '../states/search';
import links from '../values/links';
import types from './types';

export const searchForPlaces = async (startIndex, finishIndex) => {
    const { type, places, message } = await sendRequest(links.searchForPlaces,
        {
            startIndex,
            finishIndex,
            location: nearbyState.location.value,
            filters: searchState.filters.value
        });
    return type === types.SUCCESS ? { type, places } : { type, message };
};

export const getCategoryOrder = async () => {
    const { type, categories, message } = await sendRequest(links.getCategoryOrder);
    return type === types.SUCCESS ? { type, categories } : { type, message };
};

export const saveCategoryOrder = async (categories) => {
    const { type, message } = await sendRequest(links.saveCategoryOrder, { categories });
    return { type, message };
};

export const getPlaceSuggestions = async (partialName, numberOfSuggestions) => {
    if (partialName.length < 3)
        return { type: types.SUCCESS, suggestions: [] };
    const { type, suggestions, message }
        = await sendRequest(links.getPlaceSuggestions, { partialName, numberOfSuggestions });
    return type === types.SUCCESS ? { type, suggestions } : { type, message };
};