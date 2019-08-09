import React, { Component } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Filters, PlaceOverview, SearchBarHeader } from '../../recurring';
import { ActivityIndicator, Toast } from '../../common';
import { searchForPlaces } from '../../../../core/useCases/search';
import sceneKeys from '../../../values/sceneKeys';
import coreSearchState from '../../../../core/states/search';
import coreHeaderFooterState from '../../../../core/states/headerFooter';
import types from '../../../../core/useCases/types';
import textMap from '../../../values/categoryTextMap';
import filters from '../../../../core/values/filters';
import strings from '../../../../common/values/strings';
import styles from './styles';

class CategorySearch extends Component {
    constructor(props) {
        super(props);
        this.state = { places: null, loading: false, refreshing: false, offset: 0, showListFooter: false };
        this.NUMBER_OF_PLACES_PER_REQUEST = 10;
    }

    componentDidMount() {
        coreSearchState.filters.registerListener(this.displayPlaces);
        setTimeout(this.displayPlaces, 10);
    }

    componentWillUnmount() {
        coreSearchState.filters.unregisterListener(this.displayPlaces);
        coreHeaderFooterState.header.searchBarDefaultText.value = '';
    }

    displayPlaces = async () => {
        this.setState(this.state.places ? { refreshing: true } : { loading: true });
        const { type, places, message } = await searchForPlaces(0, this.NUMBER_OF_PLACES_PER_REQUEST);
        if (type === types.SUCCESS) {
            this.setState({
                places,
                loading: false,
                refreshing: false,
                offset: places.length,
                showListFooter: places.length === this.NUMBER_OF_PLACES_PER_REQUEST
            });
        } else {
            Toast.show(message);
            this.setState({ loading: false, refreshing: false });
        }
    }

    onLoadMore = async () => {
        const { offset } = this.state;
        if (this.shouldNotLoadMore())
            return;
        const { type, places, message } = await searchForPlaces(offset, offset + this.NUMBER_OF_PLACES_PER_REQUEST);
        if (type === types.SUCCESS) {
            this.setState({
                places: [...this.state.places, ...places],
                offset: offset + places.length,
                showListFooter: places.length === this.NUMBER_OF_PLACES_PER_REQUEST
            });
        } else {
            Toast.show(message);
        }
    }

    shouldNotLoadMore = () => (this.state.offset % this.NUMBER_OF_PLACES_PER_REQUEST !== 0)

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => <PlaceOverview place={item} />

    renderNoResultsFound = () => {
        const name = coreSearchState.filters.value[filters.PARTIAL_NAME];
        return (name && this.state.places ?
            <View style={styles.placeNotFoundContainer}>
                <Text style={styles.placeNotFoundText}>
                    {`"${name}" ${strings.placeNotFound}`}
                </Text>
                <TouchableOpacity onPress={Actions[sceneKeys.MAIN.ADD_PLACE]}>
                    <Text style={styles.addToZeilaText}>{strings.addToZeila}</Text>
                </TouchableOpacity>
            </View> : null);
    }

    render() {
        const { places, loading, refreshing, showListFooter } = this.state;
        const categoryName = textMap[coreSearchState.filters.value[filters.CATEGORY]];
        return (
            <View style={styles.container}>
                <SearchBarHeader />
                <View style={styles.content}>
                    <Filters />
                    <Text style={styles.placesText}>
                        {categoryName || strings.places}
                    </Text>
                    {loading ? <ActivityIndicator /> :
                        (places && places.length > 0 ? <FlatList
                            data={places}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<Text>{strings.noPlaces}</Text>}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={this.displayPlaces}
                                    colors={[styles.refreshControlColor]}
                                />
                            }
                            ListFooterComponent={showListFooter ? <ActivityIndicator /> : <View />}
                            onEndReached={this.onLoadMore}
                        /> : this.renderNoResultsFound())}
                </View>
            </View>
        );
    }
}

export { CategorySearch };