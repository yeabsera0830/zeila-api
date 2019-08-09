import React, { Component } from 'react';
import { Keyboard, LayoutAnimation, TextInput, UIManager, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SearchBarIcon } from './SearchBarIcon';
import { SearchBarSuggestions } from './SearchBarSuggestions';
import { Icon, Toast } from '../../common';
import sceneKeys from '../../../values/sceneKeys';
import { getPlaceSuggestions } from '../../../../core/useCases/search';
import coreState from '../../../../core/states/headerFooter';
import coreSuggestionsState from '../../../../core/states/suggestions';
import coreSearchState from '../../../../core/states/search';
import types from '../../../../core/useCases/types';
import filters from '../../../../core/values/filters';
import strings from '../../../../common/values/strings';
import icons from '../../../values/icons';
import styles from './styles';

class SearchBarHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: coreState.header.searchBarDefaultText.value,
            searchBarFocused: false,
            activeIndex: coreState.header.activeIndex.value,
            isSearchBarContainerMounted: false,
            height: 0
        };
        this.SURPRISE_ME_INDEX = 0;
        this.NOTIFICATIONS_INDEX = 1;
        this.ITEMS = [
            { icon: icons.surpriseMe, onPress: () => { } },
            { icon: icons.notifications, onPress: () => { } }
        ];
        this.NUMBER_OF_SUGGESTIONS = 5;
    }

    componentDidMount() {
        coreState.header.activeIndex.registerListener(this.onActiveIndexChangeListener);
        coreState.header.searchBarDefaultText.registerListener(this.onDefaultValueChangeListener);
        Keyboard.addListener('keyboardDidHide', this.forceSearchBarBlur);
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    componentWillUnmount() {
        coreState.header.activeIndex.unregisterListener(this.onActiveIndexChangeListener);
        coreState.header.searchBarDefaultText.unregisterListener(this.onDefaultValueChangeListener);
        Keyboard.removeListener('keyboardDidHide', this.forceSearchBarBlur);
    }

    forceSearchBarBlur = () => {
        this.refs.searchBar.blur();
    }

    onDefaultValueChangeListener = (defaultValue) => {
        this.setState({ value: defaultValue });
    }

    onActiveIndexChangeListener = (activeIndex) => {
        this.setState({ activeIndex });
        if (activeIndex !== -1)
            coreState.footer.activeIndex.value = -1;
    }

    onChangeText = async (text) => {
        this.setState({ value: text });
        const { type, suggestions, message } = await getPlaceSuggestions(text, this.NUMBER_OF_SUGGESTIONS);
        if (type === types.SUCCESS) {
            coreSuggestionsState.value = suggestions;
        } else {
            coreSuggestionsState.value = [];
            Toast.show(message);
        }
    }

    onSearchBarFocus = () => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ searchBarFocused: true });
    }

    onSearchBarBlur = () => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ searchBarFocused: false });
        coreSuggestionsState.value = [];
    }

    onSearchBarSubmit = () => {
        const { value } = this.state;
        if (!value)
            return;
        coreSearchState.filters.add(filters.PARTIAL_NAME, value);
        coreState.header.searchBarDefaultText.value = value;
        this.onSearchBarBlur();
        Actions[sceneKeys.MAIN.CATEGORY_SEARCH]();
    }

    onLayout = ({ nativeEvent }) => {
        if (!this.state.isSearchBarContainerMounted)
            this.setState({ isSearchBarContainerMounted: true, height: nativeEvent.layout.height });
    }

    render() {
        const { activeIndex, value, searchBarFocused, height } = this.state;
        return (
            <View>
                <View style={styles.container} onLayout={this.onLayout}>
                    {!searchBarFocused ?
                        <SearchBarIcon
                            icon={this.ITEMS[this.SURPRISE_ME_INDEX].icon}
                            title={strings.surpriseMe}
                            badgeValue={0}
                            onPress={this.ITEMS[this.SURPRISE_ME_INDEX].onPress}
                            isActive={activeIndex === this.SURPRISE_ME_INDEX}
                        /> : null}
                    <View style={styles.searchBar}>
                        <Icon icon={icons.search} style={styles.searchIcon} />
                        <TextInput
                            ref='searchBar'
                            value={value}
                            placeholder={strings.searchBarPlaceholder}
                            onChangeText={this.onChangeText}
                            onFocus={this.onSearchBarFocus}
                            onBlur={this.onSearchBarBlur}
                            onSubmitEditing={this.onSearchBarSubmit}
                            returnKeyType='go'
                            selectTextOnFocus
                            placeholderTextColor={styles.searchBarPlaceholderColor}
                            style={styles.searchBarInput}
                        />
                    </View>
                    {!searchBarFocused ?
                        <SearchBarIcon
                            icon={this.ITEMS[this.NOTIFICATIONS_INDEX].icon}
                            title={strings.notifications}
                            badgeValue={0}
                            onPress={this.ITEMS[this.NOTIFICATIONS_INDEX].onPress}
                            isActive={activeIndex === this.NOTIFICATIONS_INDEX}
                        /> : null}
                </View>
                <SearchBarSuggestions top={height} />
            </View>
        );
    }
}

export { SearchBarHeader };