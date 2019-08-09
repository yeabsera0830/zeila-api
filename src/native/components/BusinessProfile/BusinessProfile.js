import React, { Component } from 'react';
import {
    Alert, Image, LayoutAnimation, Linking, Platform, ScrollView, Text, TouchableOpacity, UIManager, View
} from 'react-native';
import { ImagePicker } from 'expo';
import { Overlay } from 'react-native-elements';
import { ReviewFooter } from './ReviewFooter';
import { ActivityIndicator, CondensableText, Icon, Rating, Toast } from '../common';
import { filterTypes, Review, SearchBarHeader } from '../recurring';
import {
    getBusinessProfile, addToBookmarks, removeFromBookmarks, rateBusiness, reviewBusiness, uploadPhoto, requestCameraPermissions
} from '../../../core/useCases/business';
import coreState from '../../../core/states/search';
import coreNearbyState from '../../../core/states/nearby';
import coreHeaderFooterState from '../../../core/states/headerFooter';
import coreMapViewState from '../../../core/states/mapView';
import types from '../../../core/useCases/types';
import links from '../../../core/values/links';
import strings from '../../../common/values/strings';
import { getLocation } from '../../Utils/location';
import icons from '../../values/icons';
import styles from './styles';

class BusinessProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            allPhotos: null,
            loading: false,
            isSinglePhotoOverlayVisible: false,
            isPhotosOverlayVisible: false,
            isShowingAllReviews: false,
            isOverlayVisible: false,
            selectedPhoto: null
        };
        this.MAX_NUM_OF_ABRIDGED_OVERVIEW_CHARS = 50;
        this.MAIN_NUMBER_OF_PHOTOS = 5;
        this.MAIN_NUMBER_OF_REVIEWS = 3;
    }

    componentDidMount() {
        this.getProfile();
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    getProfile = async () => {
        this.setState({ loading: true });
        const { type, profile, message } = await getBusinessProfile(
            coreState.selectedBusinessId.value, this.MAIN_NUMBER_OF_PHOTOS, this.MAIN_NUMBER_OF_REVIEWS);
        if (type === types.SUCCESS) {
            coreHeaderFooterState.header.searchBarDefaultText.value = profile.name;
            this.setState({ profile, loading: false });
        } else {
            Toast.show(message);
            this.setState({ loading: false });
        }
    }

    getPriceText = () => {
        for (const priceType of Object.values(filterTypes.PRICE)) {
            if (this.state.profile.price === priceType.value)
                return `${strings.price}: ${priceType.text}`;
        }
        return '';
    }

    onBookmarkPress = () => {
        if (this.state.profile.bookmarked)
            this.removeFromBookmarks();
        else
            this.addToBookmarks();
    }

    addToBookmarks = async () => {
        this.setState({ profile: { ...this.state.profile, bookmarked: true } });
        const { type, message } = await addToBookmarks(coreState.selectedBusinessId.value);
        if (type === types.SUCCESS) {
            Toast.show(strings.bookmarkAdded);
        } else {
            Toast.show(message);
            this.setState({ profile: { ...this.state.profile, bookmarked: false } });
        }
    }

    removeFromBookmarks = async () => {
        this.setState({ profile: { ...this.state.profile, bookmarked: false } });
        const { type, message } = await removeFromBookmarks(coreState.selectedBusinessId.value);
        if (type === types.SUCCESS) {
            Toast.show(strings.bookmarkRemoved);
        } else {
            Toast.show(message);
            this.setState({ profile: { ...this.state.profile, bookmarked: true } });
        }
    }

    onBookmarkLongPress = () => {
        Toast.show(strings.addToBookmarks);
    }

    onLocationPress = () => {
        if (coreNearbyState.location.hasValue())
            this.showMapView();
        else
            getLocation(this.showMapView);
    }

    onLocationLongPress = () => {
        Toast.show(strings.showInEmbeddedMap);
    }

    showMapView = () => {
        const { profile } = this.state;
        coreMapViewState.type = coreMapViewState.types.DESTINATION;
        coreMapViewState.destination.location = profile.location;
        coreMapViewState.destination.placeName = profile.name;
        coreMapViewState.isVisible.value = true;
    }

    onFinishRating = async (value) => {
        const { profile } = this.state;
        if (value === profile.myRating)
            return;
        const { type, newRating, message } = await rateBusiness(coreState.selectedBusinessId.value, value);
        if (type === types.SUCCESS) {
            this.setState({
                profile: {
                    ...this.state.profile,
                    rating: newRating.value,
                    numberOfRatings: newRating.numberOfRatings,
                    myRating: value
                }
            });
        } else {
            Toast.show(message);
        }
    }

    onPhotoPress = (photo) => this.setState({ isSinglePhotoOverlayVisible: true, selectedPhoto: photo });

    onSeeAllPhotos = async () => {
        this.setState({ isPhotosOverlayVisible: true, allPhotos: this.state.profile.photos });
        const { type, profile, message } = await getBusinessProfile(coreState.selectedBusinessId.value, -1, 0);
        if (type === types.SUCCESS) {
            this.setState({ allPhotos: profile.photos });
        } else {
            Toast.show(message);
        }
    }

    onSeeAllReviews = async () => {
        const { type, profile, message } = await getBusinessProfile(coreState.selectedBusinessId.value, 0, -1);
        if (type === types.SUCCESS) {
            LayoutAnimation.easeInEaseOut();
            this.setState({ profile: { ...this.state.profile, reviews: profile.reviews }, isShowingAllReviews: true },
                () => {
                    setTimeout(() => {
                        this.refs.scrollview.scrollToEnd();
                    }, 1000);
                });
        } else {
            Toast.show(message);
        }
    }

    renderPhotoOverlay = () => {
        const { isSinglePhotoOverlayVisible, selectedPhoto } = this.state;
        return (
            <Overlay
                isVisible={isSinglePhotoOverlayVisible}
                onBackdropPress={this.dismissPhotosPopup}
                height='auto'
                width='auto'
                windowBackgroundColor={styles.singlePhotoOverlayBackgroundColor}
                overlayStyle={styles.singlePhotoOverlay}
            >
                {isSinglePhotoOverlayVisible ?
                    <Image source={{ uri: selectedPhoto }} style={styles.photoInOverlay} /> : <View />}
            </Overlay>);
    }

    renderAllPhotos = () => {
        const { allPhotos, isPhotosOverlayVisible } = this.state;
        return (
            <Overlay isVisible={isPhotosOverlayVisible} onBackdropPress={this.dismissPhotosPopup} fullScreen>
                <ScrollView>
                    {isPhotosOverlayVisible && allPhotos ?
                        allPhotos.map((photo, index) =>
                            <Image key={index} source={{ uri: photo }} style={styles.photoLarge} />)
                        : null}
                </ScrollView>
            </Overlay>);
    }

    dismissPhotosPopup = () => this.setState({ isSinglePhotoOverlayVisible: false, isPhotosOverlayVisible: false })

    onUploadPhotoOptionPress = async (isFromStorage) => {
        if (!(await requestCameraPermissions()))
            return;
        const { cancelled, uri } = isFromStorage ?
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true
            }) : await ImagePicker.launchCameraAsync({ allowsEditing: true });
        if (cancelled)
            return;
        const formattedURI = Platform.OS === 'android' ? uri : uri.replace('file://', '');
        this.setState({ isOverlayVisible: true });
        const { type, message } = await uploadPhoto(coreState.selectedBusinessId.value, formattedURI);
        this.setState({ isOverlayVisible: false });
        Toast.show(type === types.SUCCESS ? strings.photoUploadSuccessful : message);
    }

    onSendPress = async (text, successCallback) => {
        const { type, message } = await reviewBusiness(coreState.selectedBusinessId.value, text);
        if (type === types.SUCCESS) {
            successCallback();
            const { type, profile, message } =
                await getBusinessProfile(coreState.selectedBusinessId.value, 0, this.MAIN_NUMBER_OF_REVIEWS);
            if (type === types.SUCCESS) {
                Toast.show(strings.reviewAdded);
                this.setState({ profile: { ...this.state.profile, reviews: profile.reviews } });
            } else {
                Toast.show(message);
            }
        } else {
            Toast.show(message);
        }
    }

    onReadGuidelinesPress = () => {
        Alert.alert(strings.readReviewGuidelines, strings.readReviewGuidelinesPrompt, [
            { text: strings.cancel, onPress: () => { } },
            { text: strings.ok, onPress: () => Linking.openURL(links.REVIEW_GUIDELINES) },
        ]);
    }

    formatReadableAddress = (address) => `${address.major}, ${address.minor}`

    render() {
        const { profile, loading, isShowingAllReviews, isOverlayVisible } = this.state;
        return (
            <View style={styles.container}>
                <SearchBarHeader />
                {loading ? <ActivityIndicator /> :
                    (profile ?
                        <View style={styles.content}>
                            <ScrollView
                                ref='scrollview'
                                showsVerticalScrollIndicator={false}
                                style={styles.scrollView}
                            >
                                <View style={styles.placeContainer}>
                                    <View style={styles.upper}>
                                        <View style={styles.leftContainer}>
                                            <Image source={{ uri: profile.profilePicture }} style={styles.thumbnail} />
                                            <Rating
                                                readonly
                                                rating={profile.rating}
                                                numberOfRatings={profile.numberOfRatings}
                                                showDetails
                                            />
                                        </View>
                                        <View style={styles.rightContainer}>
                                            <Text style={styles.title}>{profile.name}</Text>
                                            <CondensableText
                                                text={profile.overview}
                                                readMoreText={strings.readMoreOverview}
                                                numOfCharactersForAbridged={this.MAX_NUM_OF_ABRIDGED_OVERVIEW_CHARS}
                                                style={styles.detailText}
                                            />
                                            {this.getPriceText() ?
                                                <Text style={styles.price}>
                                                    {this.getPriceText()}
                                                </Text> : null}
                                            <Text style={styles.addressText}>
                                                {this.formatReadableAddress(profile.address)}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.bottomRow}>
                                        <TouchableOpacity
                                            onPress={this.onBookmarkPress}
                                            onLongPress={this.onBookmarkLongPress}
                                        >
                                            <Icon
                                                icon={icons.bookmark}
                                                style={profile.bookmarked ? styles.bookmarked : styles.icon}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={this.onLocationPress}
                                            onLongPress={this.onLocationLongPress}
                                        >
                                            <Icon icon={icons.location} style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                    <Rating rating={profile.myRating} onFinishRating={this.onFinishRating} />
                                </View>
                                {profile.photos.length > 0 ?
                                    <View>
                                        <Text style={styles.sectionTitle}>{strings.photos}</Text>
                                        <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            style={styles.photosScrollView}
                                        >
                                            {profile.photos.map((photo, index) =>
                                                <TouchableOpacity key={index} onPress={() => this.onPhotoPress(photo)}>
                                                    <Image source={{ uri: photo }} style={styles.photo} />
                                                </TouchableOpacity>
                                            )}
                                        </ScrollView>
                                        <TouchableOpacity onPress={this.onSeeAllPhotos}>
                                            <Text style={styles.seeAll}>{strings.seeAll}</Text>
                                        </TouchableOpacity>
                                        {this.renderPhotoOverlay()}
                                        {this.renderAllPhotos()}
                                    </View> : null}
                                {profile.reviews.length > 0 ?
                                    <View>
                                        <Text style={styles.sectionTitle}>{strings.reviews}</Text>
                                        {profile.reviews.map((reviewId, index) => {
                                            return (
                                                <Review
                                                    key={reviewId}
                                                    id={reviewId}
                                                    isMine={profile.reviewedByMe && index === 0}
                                                />);
                                        })}
                                        {isShowingAllReviews ? null :
                                            (profile.reviews.length === this.MAIN_NUMBER_OF_REVIEWS ?
                                                <TouchableOpacity onPress={this.onSeeAllReviews}>
                                                    <Text style={styles.seeAll}>{strings.seeAll}</Text>
                                                </TouchableOpacity> : null)}
                                    </View> : null}
                            </ScrollView>
                            <ReviewFooter
                                reviewedByMe={profile.reviewedByMe}
                                onCameraPress={this.onUploadPhotoOptionPress}
                                onStoragePress={() => this.onUploadPhotoOptionPress(true)}
                                onSendPress={this.onSendPress}
                                onReadGuidelinesPress={this.onReadGuidelinesPress}
                            />
                            <Overlay isVisible={isOverlayVisible} height='auto' width='auto'>
                                <View style={styles.overlayContainer}>
                                    <ActivityIndicator />
                                    <Text style={styles.overlayText}>{strings.uploadingPhoto}</Text>
                                </View>
                            </Overlay>
                        </View> : null)}
            </View>);
    }
}

export { BusinessProfile };