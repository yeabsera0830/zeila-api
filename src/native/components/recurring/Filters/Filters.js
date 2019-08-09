import React, { Component, Fragment } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox, Overlay } from 'react-native-elements';
import { Icon } from '../../common';
import { getCategoryOrder } from '../../../../core/useCases/search';
import coreState from '../../../../core/states/search';
import filters from '../../../../core/values/filters';
import categories from '../../../../core/values/categories';
import strings from '../../../../common/values/strings';
import textMap from '../../../values/filterTextMap';
import categoryTextMap from '../../../values/categoryTextMap';
import categoryIconMap from '../../../values/categoryIconMap';
import options from './options';
import { filterTypes } from './types';
import styles from './styles';
import types from '../../../../core/useCases/types';

class Filters extends Component {
    state = {
        isPopupVisible: false,
        isCategoryPopupVisible: false,
        categoryOrder: Object.keys(categories),
        filterPressed: null,
        checkBoxPopupCheckedOptions: null
    };

    async componentDidMount() {
        if (coreState.categoryOrder.hasValue()) {
            this.setState({ categoryOrder: coreState.categoryOrder.value });
        } else {
            const response = await getCategoryOrder();
            if (response.type === types.SUCCESS)
                this.setState({ categoryOrder: response.categories });
        }
    }

    onItemPress = (filter) => {
        if (filter === filters.CATEGORY) {
            this.setState({ filterPressed: filter, isCategoryPopupVisible: true });
        } else if (options[filter].type === filterTypes.CHECK) {
            this.setState({
                checkBoxPopupCheckedOptions: coreState.filters.value[filter] || [],
                filterPressed: filter,
                isPopupVisible: true
            });
        } else {
            this.setState({ filterPressed: filter, isPopupVisible: true });
        }
    }

    renderCategoryPopup = () => {
        const { isCategoryPopupVisible, categoryOrder } = this.state;
        return (
            <Overlay isVisible={isCategoryPopupVisible} onBackdropPress={this.dismissPopup} width='auto'>
                {isCategoryPopupVisible ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {categoryOrder.map(category => {
                            return (
                                <TouchableOpacity
                                    key={`${category}`}
                                    onPress={() => this.onCategoryPopupOptionPress(category)}
                                    style={styles.categoryBadge}
                                >
                                    <Icon icon={categoryIconMap[category]} style={styles.categoryIcon} />
                                    <Text style={styles.categoryText}>{categoryTextMap[category]}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView> : <View />}
            </Overlay>
        );
    }

    onCategoryPopupOptionPress = (category) => {
        this.setState({ isCategoryPopupVisible: false }, () => {
            setTimeout(() => {
                coreState.filters.add(filters.CATEGORY, category);
            }, 100);
        });
    }

    renderFilterPopup = () => {
        const { isPopupVisible, filterPressed } = this.state;
        return (
            <Overlay
                isVisible={isPopupVisible}
                onBackdropPress={this.dismissPopup}
                height='auto'
            >
                {isPopupVisible ? this.renderPopupContent(options[filterPressed]) : <View />}
            </Overlay>
        );
    }

    dismissPopup = () => {
        this.setState({ isPopupVisible: false, isCategoryPopupVisible: false, checkBoxPopupCheckedOptions: null });
    }

    renderPopupContent = ({ type, values }) => {
        switch (type) {
            case filterTypes.RADIO:
                return this.renderRadioPopupContent(values);
            case filterTypes.CHECK:
                return this.renderCheckPopupContent(values);
            default:
                return null;
        }
    }

    renderRadioPopupContent = (values) => {
        return (
            <Fragment>
                {values.map(option => (
                    <TouchableOpacity key={option.text} onPress={() => this.onRadioPopupOptionPress(option.value)}>
                        <Text style={styles.popupOptionText}>{option.text}</Text>
                    </TouchableOpacity>))}
            </Fragment>
        );
    }

    onRadioPopupOptionPress = (option) => {
        this.setState({ isPopupVisible: false });
        setTimeout(() => {
            coreState.filters.add(this.state.filterPressed, option);
        }, 100);
    }

    renderCheckPopupContent = (values) => {
        const { checkBoxPopupCheckedOptions } = this.state;
        return (
            <Fragment>
                {values.map((option, index) => (
                    <CheckBox
                        key={option.text}
                        title={option.text}
                        onPress={() => this.onCheckPopupOptionPress(index)}
                        checked={checkBoxPopupCheckedOptions.includes(index)}
                        textStyle={styles.popupOptionText}
                        containerStyle={styles.checkBoxContainerStyle}
                        checkedColor={styles.checkBoxColor}
                        uncheckedColor={styles.checkBoxColor}
                    />))}
                <TouchableOpacity onPress={this.onCheckPopupOptionsFinish}>
                    <Text style={styles.checkBoxPopupOkButton}>{strings.ok}</Text>
                </TouchableOpacity>
            </Fragment>
        );
    }

    onCheckPopupOptionPress = (index) => {
        const { checkBoxPopupCheckedOptions } = this.state;
        this.setState({
            checkBoxPopupCheckedOptions: checkBoxPopupCheckedOptions.includes(index) ?
                checkBoxPopupCheckedOptions.filter(item => (item !== index)) : [...checkBoxPopupCheckedOptions, index]
        });
    }

    onCheckPopupOptionsFinish = () => {
        this.setState({ isPopupVisible: false });
        setTimeout(() => {
            coreState.filters.add(this.state.filterPressed, this.state.checkBoxPopupCheckedOptions);
            this.setState({ checkBoxPopupCheckedOptions: null });
        }, 100);
    }

    shouldNotDisplayFilter = (filter) => { // can be removed once all the filters get implemented
        return !(options[filter] || filter === filters.CATEGORY);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    {strings.filters}
                </Text>
                <View style={styles.filtersContainer}>
                    {Object.values(filters).map(filter => (
                        this.shouldNotDisplayFilter(filter) ? null :
                            <Text key={filter} onPress={() => this.onItemPress(filter)} style={styles.badge}>
                                {textMap[filter]}
                            </Text>
                    ))}
                </View>
                {this.renderFilterPopup()}
                {this.renderCategoryPopup()}
            </View>
        );
    }
}

export { Filters };