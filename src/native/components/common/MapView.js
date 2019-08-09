import React, { Component } from 'react';
import { Linking, Platform, Text, View } from 'react-native';
import NativeMapView, { Marker } from 'react-native-maps';
import { Overlay } from 'react-native-elements';
import { Toast } from './Toast';
import coreState from '../../../core/states/mapView';
import coreNearbyState from '../../../core/states/nearby';
import links from '../../../core/values/links';
import strings from '../../../common/values/strings';
import colors from '../../values/colors';

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = { isOverlayVisible: false, manualLocation: null };
        this.LATITUDE_TO_LONGITUDE_DELTA_RATIO = 922 / 421;
        this.LATITUDE_DELTA = 0.3;
        this.LATITUDE_DELTA_SMALL = 0.05;
        this.DEFAULT_LOCATION = { latitude: 8.9806, longitude: 38.7578 }; // Addis Ababa
        this.initialRegion = this.DEFAULT_LOCATION;
        this.markerIds = ['myLocation', 'destination'];
        this.EDGE_PADDING = { top: 150, bottom: 25, left: 50, right: 50 };
    }

    componentDidMount() {
        coreState.isVisible.registerListener(this.onOverlayVisibilityChange);
    }

    componentWillUnmount() {
        coreState.isVisible.unregisterListener(this.onOverlayVisibilityChange);
    }

    onOverlayVisibilityChange = (isOverlayVisible) => {
        if (isOverlayVisible)
            this.mapViewWillBecomeVisible();
        else
            this.mapViewWillBecomeInvisible();
        this.setState({ isOverlayVisible }, () => {
            if (isOverlayVisible)
                this.mapViewDidBecomeVisible();
        });
    }

    mapViewWillBecomeVisible = () => {
        if (coreState.type === coreState.types.MANUAL_LOCATION && coreNearbyState.location.hasValue())
            this.initialRegion = coreNearbyState.location.value;
    }

    mapViewDidBecomeVisible = () => {
        if (coreState.type === coreState.types.DESTINATION)
            this.fitToSuppliedMarkers();
    }

    fitToSuppliedMarkers = async () => {
        while (!(this.mapView && this.myLocation && this.destination))
            await (new Promise(resolve => setTimeout(resolve, 150)));
        this.mapView.fitToSuppliedMarkers(this.markerIds, {
            edgePadding: this.EDGE_PADDING,
            animated: true
        });
        this.destination.showCallout();
    }

    mapViewWillBecomeInvisible = () => this.setState({ manualLocation: null });

    onMapViewPress = (event) => this.setState({ manualLocation: event.nativeEvent.coordinate })

    onOpenInMapsPress = () => {
        const destination = coreState.destination.location;
        const destinationAddress = `${destination.latitude}, ${destination.longitude}`;
        const encodedDestinationAddress = encodeURIComponent(destinationAddress);
        Linking.openURL(`${Platform.OS === 'android' ? links.GOOGLE_LOCATION : links.APPLE_LOCATION}${
            encodedDestinationAddress}`);
    }

    renderManualLocationMapView = () => {
        const { manualLocation } = this.state;
        const delta = this.initialRegion === this.DEFAULT_LOCATION ? this.LATITUDE_DELTA : this.LATITUDE_DELTA_SMALL;
        return (
            <View style={styles.container}>
                <NativeMapView
                    loadingEnabled
                    initialRegion={{
                        latitude: this.initialRegion.latitude,
                        longitude: this.initialRegion.longitude,
                        latitudeDelta: delta,
                        longitudeDelta: delta / this.LATITUDE_TO_LONGITUDE_DELTA_RATIO
                    }}
                    onPress={this.onMapViewPress}
                    style={styles.mapView}
                >
                    {manualLocation ?
                        <Marker coordinate={manualLocation} pinColor={colors.mapMarker} /> : null}
                </NativeMapView>
                <View style={styles.buttonsContainer}>
                    <Text onPress={this.onCancelPress} style={styles.locateManuallyMapViewButton}>
                        {strings.cancel}
                    </Text>
                    <Text onPress={this.onOKPress} style={styles.locateManuallyMapViewButton}>
                        {strings.ok}
                    </Text>
                </View>
            </View>
        );
    }

    onDestinationMapViewRender = (ref) => {
        this.mapView = ref;
    }

    onMyLocationMarkerRender = (ref) => {
        this.myLocation = ref;
    }

    onDestinationMarkerRender = (ref) => {
        this.destination = ref;
    }

    renderDestinationMapView = () => {
        const myLocation = coreNearbyState.location.value;
        return (
            <View style={styles.container}>
                <NativeMapView
                    loadingEnabled
                    initialRegion={{
                        latitude: this.DEFAULT_LOCATION.latitude,
                        longitude: this.DEFAULT_LOCATION.longitude,
                        latitudeDelta: this.LATITUDE_DELTA,
                        longitudeDelta: this.LATITUDE_DELTA / this.LATITUDE_TO_LONGITUDE_DELTA_RATIO
                    }}
                    ref={this.onDestinationMapViewRender}
                    style={styles.mapView}
                >
                    <Marker
                        identifier={this.markerIds[0]}
                        ref={this.onMyLocationMarkerRender}
                        coordinate={myLocation}
                        title={strings.you}
                        pinColor={colors.mapMarker}
                    />
                    <Marker
                        identifier={this.markerIds[1]}
                        ref={this.onDestinationMarkerRender}
                        coordinate={coreState.destination.location}
                        title={coreState.destination.placeName}
                    />
                </NativeMapView>
                <Text onPress={this.onOpenInMapsPress} style={styles.openInMapsButton}>
                    {strings.openInMaps}
                </Text>
            </View>
        );
    }

    onCancelPress = () => coreState.manualLocation.onCancel();

    onOKPress = () => {
        const { manualLocation } = this.state;
        if (manualLocation)
            coreState.manualLocation.onSet(manualLocation);
        else
            Toast.show(strings.setYourLocation);
    }

    dismissMapView = () => {
        coreState.isVisible.value = false;
    }

    renderMapView = () => {
        return (this.state.isOverlayVisible ?
            (coreState.type === coreState.types.MANUAL_LOCATION ?
                this.renderManualLocationMapView() : this.renderDestinationMapView())
            : <View />
        );
    }

    render() {
        const { isOverlayVisible } = this.state;
        return (
            <Overlay
                isVisible={isOverlayVisible}
                fullScreen
                overlayStyle={styles.overlay}
                onBackdropPress={this.dismissMapView}
            >
                {this.renderMapView()}
            </Overlay>
        );
    }
}

const MINIMAL_SPACE = 15;
const FONT_SIZE = 20;
const styles = {
    overlay: {
        padding: 0
    },
    container: {
        flex: 1
    },
    mapView: {
        flex: 1
    },
    buttonsContainer: {
        flexDirection: 'row',
        paddingVertical: MINIMAL_SPACE
    },
    locateManuallyMapViewButton: {
        flex: 1,
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: FONT_SIZE,
        textAlign: 'center'
    },
    openInMapsButton: {
        width: '100%',
        paddingVertical: MINIMAL_SPACE,
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: FONT_SIZE,
        textAlign: 'center'
    }
};

export { MapView };