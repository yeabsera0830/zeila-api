export const capitalizeFirstLetter = (text) => {
    if (!text)
        return text;
    return `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;
};

export const sleep = async (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));