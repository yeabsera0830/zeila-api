import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GridIcon } from './GridIcon';
import { ActivityIndicator, Toast } from '../common';
import sceneKeys from '../../values/sceneKeys';
import { getNearbyPlaces } from '../../../core/useCases/nearby';
import coreState from '../../../core/states/nearby';
import coreSearchState from '../../../core/states/search';
import types from '../../../core/useCases/types';
import filters from '../../../core/values/filters';
import { filterTypes } from '../recurring';
import categoryTextMap from '../../values/categoryTextMap';
import strings from '../../../common/values/strings';
import iconMap from '../../values/categoryIconMap';

class CategoryGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { places: null, loading: false };
        this.ITEMS_PER_ROW = 3;
    }

    componentDidMount() {
        coreState.location.registerListener(this.getNearbyPlaces);
        coreState.location.registerLoadingStateChangeListener(this.displayGridItems);
        if (this.hasFreshCache())
            this.getPlacesFromCache();
        else
            this.displayGridItems();
    }

    componentWillUnmount() {
        coreState.location.unregisterListener(this.getNearbyPlaces);
        coreState.location.unregisterLoadingStateChangeListener(this.displayGridItems);
    }

    hasFreshCache = () => (coreState.places.hasValue() && coreState.places.location === coreState.location.value)

    getPlacesFromCache = () => setTimeout(() => this.setState({ places: coreState.places.value }), 10)

    displayGridItems = () => {
        if (this.canNotLocate())
            this.setState({ loading: false });
        else if (this.isLocating())
            this.setState({ loading: true });
        else
            this.getNearbyPlaces();
    }

    canNotLocate = () => (!coreState.location.hasValue() && !coreState.location.isLoading)

    isLocating = () => (!coreState.location.hasValue() && coreState.location.isLoading)

    getNearbyPlaces = async () => {
        this.setState({ loading: true });
        const { type, places, message } = await getNearbyPlaces();
        if (type === types.SUCCESS) {
            const orderedItems = this.giveSequenceToItems(places);
            const groupedItems = this.groupItemsIntoRows(orderedItems);
            this.setState({ places: groupedItems, loading: false }, this.onPlacesChange);
            if (groupedItems.length === 0)
                Toast.show(strings.noNearbyPlaces);
        } else {
            this.setState({ loading: false });
            Toast.show(message);
        }
    }

    onPlacesChange = () => {
        coreState.places.value = this.state.places;
        coreState.places.location = coreState.location.value;
    }

    giveSequenceToItems = (items) => {
        const itemKeys = Object.keys(items).sort((a, b) => {
            // sort by count (decreasing), then alphabetically (increasing)
            if (items[a] > items[b])
                return -1;
            else if (items[a] < items[b])
                return 1;
            else if (categoryTextMap[a] > categoryTextMap[b])
                return 1;
            else if (categoryTextMap[a] < categoryTextMap[b])
                return -1;
            return 0;
        });
        const sortedItems = itemKeys.map(key => {
            return { [key]: items[key] };
        });
        return sortedItems;
    }

    groupItemsIntoRows = (items) => {
        const rows = [];
        let i = 0;
        for (i = 0; i < items.length; i++) {
            if (i % this.ITEMS_PER_ROW !== 0)
                rows[rows.length - 1].push(items[i]);
            else
                rows.push([items[i]]);
        }
        // if the last row is not full, fill it with an empty view to conform to the layout
        for (i = 0; i < (this.ITEMS_PER_ROW - items.length % this.ITEMS_PER_ROW) % this.ITEMS_PER_ROW; i++) {
            rows[rows.length - 1].push({ isEmpty: true });
        }
        return rows;
    }

    onItemPress = (category) => {
        coreSearchState.filters.set(filters.CATEGORY, parseInt(category));
        coreSearchState.filters.add(filters.LOCATION, filterTypes.LOCATION.NOT_SO_FAR.value);
        Actions[sceneKeys.MAIN.CATEGORY_SEARCH]();
    }

    render() {
        const { places, loading } = this.state;
        return (
            <ScrollView>
                {loading ? <ActivityIndicator /> :
                    (places && places.length > 0 ? places.map((row, rowIndex) =>
                        <View key={rowIndex} style={styles.row}>
                            {row.map((item, itemIndex) => {
                                if (item.isEmpty)
                                    return <View key={itemIndex} style={styles.emptyItem} />;
                                const category = Object.keys(item)[0];
                                return (
                                    <GridIcon
                                        key={itemIndex}
                                        text={categoryTextMap[category]}
                                        count={item[category]}
                                        icon={iconMap[category]}
                                        onPress={() => this.onItemPress(category)}
                                    />
                                );
                            })}
                        </View>) : null)}
            </ScrollView>
        );
    }
}

const MINIMAL_SPACE = 10;

const styles = {
    row: {
        flexDirection: 'row',
        marginVertical: MINIMAL_SPACE
    },
    emptyItem: {
        flex: 1
    }
};

export { CategoryGrid };