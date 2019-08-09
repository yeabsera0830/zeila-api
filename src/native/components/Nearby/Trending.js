import React, { Component, Fragment } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { PlaceOverview } from '../recurring';
import { ActivityIndicator, Toast } from '../common';
import { getTrendingPlaces } from '../../../core/useCases/nearby';
import coreState from '../../../core/states/nearby';
import types from '../../../core/useCases/types';
import strings from '../../../common/values/strings';
import colors from '../../values/colors';

class Trending extends Component {
    constructor(props) {
        super(props);
        this.state = { places: null, loading: false, refreshing: false, offset: 0 };
        this.NUMBER_OF_PLACES_PER_REQUEST = 10;
    }

    async componentDidMount() {
        setTimeout(coreState.trending.hasValue() ? this.getPlacesFromCache : this.getTrendingPlaces, 10);
    }

    getPlacesFromCache = () => this.setState({ places: coreState.trending.value, offset: coreState.trending.offset })

    getTrendingPlaces = async () => {
        this.setState(this.state.places ? { refreshing: true } : { loading: true });
        const { type, places, message } = await getTrendingPlaces(0, this.NUMBER_OF_PLACES_PER_REQUEST);
        if (type === types.SUCCESS) {
            this.setState({
                places,
                loading: false,
                refreshing: false,
                offset: this.NUMBER_OF_PLACES_PER_REQUEST
            }, this.onPlacesChange);
            if (places.length === 0)
                Toast.show(strings.noTrendingPlaces);
        } else {
            this.setState({ loading: false, refreshing: false });
            Toast.show(message);
        }
    }

    onPlacesChange = () => {
        coreState.trending.value = this.state.places;
        coreState.trending.offset = this.state.offset;
    }

    onLoadMore = async () => {
        const { offset } = this.state;
        const { type, places, message } = await getTrendingPlaces(offset, offset + this.NUMBER_OF_PLACES_PER_REQUEST);
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
                                onRefresh={this.getTrendingPlaces}
                                colors={[colors.activityIndicator]}
                            />
                        }
                        ListFooterComponent={places.length > 0 ? <ActivityIndicator /> : null}
                        onEndReached={this.onLoadMore}
                    /> : null)}
            </Fragment>);
    }
}

export { Trending };