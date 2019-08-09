const APP_LINK = 'https://safe-escarpment-33199.herokuapp.com';

export default links = {
    GOOGLE_LOCATION: 'http://maps.google.com/?daddr=',
    APPLE_LOCATION: 'http://maps.apple.com/?daddr=',

    PASSWORD_RECOVERY: 'https://www.google.com', // should to Zeila website's password recovery page instead
    TERMS_OF_SERVICE: 'https://www.google.com', // should to Zeila website's terms of service page instead
    PRIVACY_CONDITIONS: 'https://www.google.com', // should to Zeila website's privacy conditions page instead
    REVIEW_GUIDELINES: 'https://www.google.com', // should to Zeila website's review guidelines page instead

    signUpWithFacebook: `${APP_LINK}/signup/facebook`,
    signUpWithPhone: `${APP_LINK}/signup/phone`,
    loginWithFacebook: `${APP_LINK}/login/facebook`,
    loginWithPhone: `${APP_LINK}/login/phone`,
    saveBasicInfo: `${APP_LINK}/saveBasicInfo`,

    getReadableAddress: `${APP_LINK}/address/readable`,
    getNearbyPlaces: `${APP_LINK}/places/nearby`,
    getNewPlaces: `${APP_LINK}/places/new`,
    getTrendingPlaces: `${APP_LINK}/places/trending`,
    addPlace: `${APP_LINK}/places/add`,

    searchForPlaces: `${APP_LINK}/search/places`,
    getCategoryOrder: `${APP_LINK}/categories/order`,
    saveCategoryOrder: `${APP_LINK}/categories/saveOrder`,
    getPlaceSuggestions: `${APP_LINK}/search/suggestions`,

    getBusinessProfile: `${APP_LINK}/search/place`,
    addToBookmarks: `${APP_LINK}/bookmarks/add`,
    removeFromBookmarks: `${APP_LINK}/bookmarks/remove`,
    rateBusiness: `${APP_LINK}/rate`,
    getReview: `${APP_LINK}/review`,
    reviewBusiness: `${APP_LINK}/review/add`,
    likeReview: `${APP_LINK}/review/like`,
    unlikeReview: `${APP_LINK}/review/unlike`,
    uploadPhoto: `${APP_LINK}/upload/photo`,

    getPerson: `${APP_LINK}/search/person`
};