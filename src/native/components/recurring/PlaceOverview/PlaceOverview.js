import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, Rating, Toast } from '../../common';
import { addToBookmarks, removeFromBookmarks } from '../../../../core/useCases/business';
import types from '../../../../core/useCases/types';
import sceneKeys from '../../../values/sceneKeys';
import coreState from '../../../../core/states/search';
import coreNearbyState from '../../../../core/states/nearby';
import coreMapViewState from '../../../../core/states/mapView';
import coreHeaderFooterState from '../../../../core/states/headerFooter';
import strings from '../../../../common/values/strings';
import { getLocation } from '../../../Utils/location';
import icons from '../../../values/icons';
import styles from './styles';

class PlaceOverview extends Component {
    state = { bookmarked: this.props.place.bookmarked };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.bookmarked === prevState.bookmarked && this.state.bookmarked !== this.props.place.bookmarked)
            this.setState({ bookmarked: !this.state.bookmarked });
    }

    onItemPress = () => {
        coreState.selectedBusinessId.value = this.props.place.id;
        coreHeaderFooterState.header.searchBarDefaultText.value = this.props.place.name;
        Actions[sceneKeys.MAIN.BUSINESS_PROFILE]();
    }

    onBookmarkPress = () => {
        if (this.state.bookmarked)
            this.removeFromBookmarks();
        else
            this.addToBookmarks();
    }

    addToBookmarks = async () => {
        this.setState({ bookmarked: true });
        const { type, message } = await addToBookmarks(this.props.place.id);
        if (type === types.SUCCESS) {
            Toast.show(strings.bookmarkAdded);
        } else {
            Toast.show(message);
            this.setState({ bookmarked: false });
        }
    }

    removeFromBookmarks = async () => {
        this.setState({ bookmarked: false });
        const { type, message } = await removeFromBookmarks(this.props.place.id);
        if (type === types.SUCCESS) {
            Toast.show(strings.bookmarkRemoved);
        } else {
            Toast.show(message);
            this.setState({ bookmarked: true });
        }
    }

    onBookmarkLongPress = () => Toast.show(strings.addToBookmarks)

    onLocationPress = () => {
        if (coreNearbyState.location.hasValue())
            this.showMapView();
        else
            getLocation(this.showMapView);
    }

    onLocationLongPress = () => Toast.show(strings.showInEmbeddedMap);

    showMapView = () => {
        const { location, name } = this.props.place;
        coreMapViewState.type = coreMapViewState.types.DESTINATION;
        coreMapViewState.destination.location = location;
        coreMapViewState.destination.placeName = name;
        coreMapViewState.isVisible.value = true;
    }

    render() {
        const { profilePicture, rating, name, overview, proximity } = this.props.place;
        const { bookmarked } = this.state;
        return (
            <TouchableOpacity onPress={this.onItemPress} style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: profilePicture }} style={styles.thumbnail} />
                    <Rating readonly rating={rating} />
                </View>
                <View style={styles.rightContainer}>
                    <View>
                        <Text style={styles.title}>{name}</Text>
                        <Text numberOfLines={2} style={styles.detailText}>
                            {overview}
                        </Text>
                    </View>
                    <View style={styles.detailBottomRow}>
                        <Text style={styles.proximity}>
                            {proximity ?
                                (`${proximity < 1000 ? `${proximity}m` :
                                    `${(proximity / 1000).toFixed(1)}km`} ${strings.away}`)
                                : ''}
                        </Text>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={this.onBookmarkPress} onLongPress={this.onBookmarkLongPress}>
                                <Icon icon={icons.bookmark} style={bookmarked ? styles.bookmarked : styles.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onLocationPress} onLongPress={this.onLocationLongPress}>
                                <Icon icon={icons.location} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export { PlaceOverview };