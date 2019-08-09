import React, { Component, Fragment } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { PlaceOverview } from '../recurring';
import { ActivityIndicator, Toast } from '../common';
import { getNewPlaces } from '../../../core/useCases/nearby';
import types from '../../../core/useCases/types';
import coreState from '../../../core/states/nearby';
import strings from '../../../common/values/strings';
import colors from '../../values/colors';

class New extends Component {
    constructor(props) {
        super(props);
        this.state = { places: null, loading: false, refreshing: false, offset: 0 };
        this.NUMBER_OF_PLACES_PER_REQUEST = 10;
    }

    componentDidMount() {
        coreState.location.registerListener(this.getNewPlaces);
        coreState.location.registerLoadingStateChangeListener(this.displayPlaces);
        setTimeout(this.hasFreshCache() ? this.getPlacesFromCache : this.displayPlaces, 10);
    }

    componentWillUnmount = () => {
        coreState.location.unregisterListener(this.getNewPlaces);
        coreState.location.unregisterLoadingStateChangeListener(this.displayPlaces);
    }

    hasFreshCache = () => (coreState.new.hasValue() && coreState.new.location === coreState.location.value)

    getPlacesFromCache = () => this.setState({ places: coreState.new.value, offset: coreState.new.offset })

    displayPlaces = () => {
        if (this.canNotLocate())
            this.setState({ loading: false, refreshing: false });
        else if (this.isLocating())
            this.setState({ loading: true });
        else
            this.getNewPlaces();
    }

    canNotLocate = () => (!coreState.location.hasValue() && !coreState.location.isLoading)

    isLocating = () => (!coreState.location.hasValue() && coreState.location.isLoading)

    getNewPlaces = async () => {
        this.setState(this.state.places ? { refreshing: true } : { loading: true });
        const { type, places, message } =
            await getNewPlaces(0, this.NUMBER_OF_PLACES_PER_REQUEST, coreState.location.value);
        if (type === types.SUCCESS) {
            this.setState({
                places,
                loading: false,
                refreshing: false,
                offset: this.NUMBER_OF_PLACES_PER_REQUEST
            }, this.onPlacesChange);
            if (places.length === 0)
                Toast.show(strings.noNewPlaces);
        } else {
            this.setState({ loading: false, refreshing: false });
            Toast.show(message);
        }
    }

    onPlacesChange = () => {
        coreState.new.value = this.state.places;
        coreState.new.offset = this.state.offset;
        coreState.new.location = coreState.location.value;
    }

    onLoadMore = async () => {
        const { offset } = this.state;
        const { type, places, message } =
            await getNewPlaces(offset, offset + this.NUMBER_OF_PLACES_PER_REQUEST, coreState.location.value);
        if (type === types.SUCCESS) {
            this.setState({
                places: [...this.state.places, ...places],
                offset: offset + this.NUMBER_OF_PLACES_PER_REQUEST
            }, this.onPlacesChange);
        } else {
            Toast.show(message);
        }
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => <PlaceOverview place={item} />

    render() {
        const { places, loading, refreshing } = this.state;
        return (
            <Fragment>
                {loading ? <ActivityIndicator /> :
                    (places ? <FlatList
                        data={places}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this.getNewPlaces}
                                colors={[colors.activityIndicator]}
                            />
                        }
                        ListFooterComponent={<ActivityIndicator />}
                        onEndReached={this.onLoadMore}
                    /> : null)}
            </Fragment>);
    }
}

export { New };