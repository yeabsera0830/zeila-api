import React, { Component, Fragment } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { DraggableGrid } from 'react-native-draggable-grid';
import { SearchBarHeader } from '../../recurring';
import { ActivityIndicator, Icon, Toast } from '../../common';
import { GridIcon } from './GridIcon';
import { getCategoryOrder, saveCategoryOrder } from '../../../../core/useCases/search';
import sceneKeys from '../../../values/sceneKeys';
import filters from '../../../../core/values/filters';
import coreState from '../../../../core/states/search';
import types from '../../../../core/useCases/types';
import textMap from '../../../values/categoryTextMap';
import iconMap from '../../../values/categoryIconMap';
import strings from '../../../../common/values/strings';
import icons from '../../../values/icons';
import styles from './styles';

class SearchWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            loading: false,
            isGridEditable: false,
            hasGridJustBecomeEditable: false,
            isScrollEnabled: true
        };
        this.temporaryGridOrder = null;
        this.ITEMS_PER_ROW = 3;
        this.EDITABLE_GRID_ANIMATION_GAP_MILLIS = 30;
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories = async () => {
        if (coreState.categoryOrder.hasValue()) {
            this.getCategoryOrderFromCache();
            return;
        }
        this.setState({ loading: true });
        const { type, categories, message } = await getCategoryOrder();
        if (type === types.SUCCESS) {
            coreState.categoryOrder.value = categories;
            const groupedItems = this.groupItemsIntoRows(categories);
            this.setState({ items: groupedItems, loading: false });
        } else {
            Toast.show(message);
            this.setState({ loading: false });
        }
    }

    getCategoryOrderFromCache = () => {
        setTimeout(() => {
            this.setState({ items: this.groupItemsIntoRows(coreState.categoryOrder.value) });
        }, 10);
    }

    groupItemsIntoRows = (items) => {
        const rows = [];
        let i = 0;
        let category;
        for (i = 0; i < items.length; i++) {
            category = items[i];
            if (i % this.ITEMS_PER_ROW !== 0)
                rows[rows.length - 1].push(category);
            else
                rows.push([category]);
        }
        // if the last row is not full, fill it with an empty view to conform to the layout
        for (i = 0; i < (this.ITEMS_PER_ROW - items.length % this.ITEMS_PER_ROW) % this.ITEMS_PER_ROW; i++) {
            rows[rows.length - 1].push(-1);
        }
        return rows;
    }

    getUngroupedItems = () => {
        let items = [];
        for (const row of this.state.items) {
            items = [...items, ...row];
        }
        items = items.filter(item => item !== -1)
            .map(item => ({ category: item, key: `${item}` }));
        return items;
    }

    onItemPress = async (category) => {
        coreState.filters.set(filters.CATEGORY, category);
        Actions[sceneKeys.MAIN.CATEGORY_SEARCH]();
    }

    onEditCategoriesPress = () =>
        this.setState({ isGridEditable: true, isScrollEnabled: false }, this.showEditabilityAnimation)

    onLockScrollPress = () => {
        if (this.state.isScrollEnabled)
            this.setState({ isScrollEnabled: false });
        else if (this.temporaryGridOrder)
            this.setState({ isScrollEnabled: true, items: this.groupItemsIntoRows(this.temporaryGridOrder) });
        else
            this.setState({ isScrollEnabled: true });
    }

    showEditabilityAnimation = () => {
        setTimeout(() => {
            this.setState({ hasGridJustBecomeEditable: true }, () => {
                setTimeout(() => {
                    this.setState({ hasGridJustBecomeEditable: false }, () => {
                        setTimeout(() => {
                            this.setState({ hasGridJustBecomeEditable: true }, () => {
                                setTimeout(() => {
                                    this.setState({ hasGridJustBecomeEditable: false });
                                }, this.EDITABLE_GRID_ANIMATION_GAP_MILLIS);
                            });
                        }, this.EDITABLE_GRID_ANIMATION_GAP_MILLIS);
                    });
                }, this.EDITABLE_GRID_ANIMATION_GAP_MILLIS);
            });
        }, 150);
    }

    onCancelEditCategoriesPress = () => {
        this.setState({
            isGridEditable: false,
            isScrollEnabled: true,
            items: this.groupItemsIntoRows(coreState.categoryOrder.value)
        });
        this.temporaryGridOrder = null;
    }

    onFinishEditCategoriesPress = async () => {
        if (this.temporaryGridOrder) {
            const { type, message } = await saveCategoryOrder(this.temporaryGridOrder);
            if (type === types.SUCCESS) {
                coreState.categoryOrder.value = this.temporaryGridOrder;
                const items = this.groupItemsIntoRows(this.temporaryGridOrder);
                this.setState({ items, isGridEditable: false, isScrollEnabled: true });
                this.temporaryGridOrder = null;
            } else {
                Toast.show(message);
            }
        } else {
            this.setState({ isGridEditable: false, isScrollEnabled: true });
        }
    }

    renderDraggableGrid = () => {
        return (
            <DraggableGrid
                numColumns={this.ITEMS_PER_ROW}
                renderItem={this.renderEditableGridItem}
                data={this.getUngroupedItems()}
                onDragRelease={this.onDragRelease}
            />);
    }

    renderEditableGridItem = (item) => {
        const { isGridEditable, hasGridJustBecomeEditable } = this.state;
        return (
            <View style={styles.gridIcon.editableContainer}>
                <Icon
                    icon={iconMap[item.category]}
                    style={isGridEditable && hasGridJustBecomeEditable ?
                        styles.gridIcon.animatedIcon : styles.gridIcon.icon}
                />
                <Text adjustsFontSizeToFit style={styles.gridIcon.text}>{textMap[item.category]}</Text>
            </View>);
    }

    onDragRelease = (data) => {
        this.temporaryGridOrder = data.map(item => item.category);
    }

    onEditCategoriesLongPress = () => Toast.show(strings.editCategoryOrder)

    onCancelEditCategoriesLongPress = () => Toast.show(strings.cancelCategoryOrder)

    onFinishEditCategoriesLongPress = () => Toast.show(strings.finishCategoryOrder)

    onLockScrollLongPress = () => Toast.show(strings.lockCategoryOrderScroll)

    render() {
        const { items, loading, isScrollEnabled, isGridEditable } = this.state;
        return (
            <View style={styles.container}>
                <SearchBarHeader />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{strings.categories}</Text>
                    {items ?
                        <View style={styles.editIconsContainer}>
                            {isGridEditable ?
                                <Fragment>
                                    <TouchableOpacity
                                        onPress={this.onCancelEditCategoriesPress}
                                        onLongPress={this.onCancelEditCategoriesLongPress}
                                    >
                                        <Icon icon={icons.cancelEditSearchFilters} style={styles.editIcons} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this.onFinishEditCategoriesPress}
                                        onLongPress={this.onFinishEditCategoriesLongPress}
                                    >
                                        <Icon icon={icons.finishEditSearchFilters} style={styles.editIcons} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this.onLockScrollPress}
                                        onLongPress={this.onLockScrollLongPress}
                                    >
                                        <Icon
                                            icon={isScrollEnabled ?
                                                icons.editSearchFiltersScrollUnlocked :
                                                icons.editSearchFiltersScrollLocked}
                                            style={styles.editIcons}
                                        />
                                    </TouchableOpacity>
                                </Fragment> :
                                <TouchableOpacity
                                    onPress={this.onEditCategoriesPress}
                                    onLongPress={this.onEditCategoriesLongPress}
                                >
                                    <Icon icon={icons.editSearchCategories} style={styles.editIcons} />
                                </TouchableOpacity>}
                        </View> : null}
                </View>
                <ScrollView scrollEnabled={isScrollEnabled}>
                    {isGridEditable ? this.renderDraggableGrid() :
                        (loading ? <ActivityIndicator /> :
                            (items ?
                                items.map((row, rowIndex) =>
                                    <View style={styles.row} key={rowIndex}>
                                        {row.map((item, itemIndex) => {
                                            if (item === -1)
                                                return <View key={itemIndex} style={{ flex: 1 }} />;
                                            return (
                                                <GridIcon
                                                    key={itemIndex}
                                                    text={textMap[item]}
                                                    icon={iconMap[item]}
                                                    onPress={() => this.onItemPress(item)}
                                                />);
                                        })}
                                    </View>) : items))}
                </ScrollView>
            </View>
        );
    }
}

export { SearchWrapper };