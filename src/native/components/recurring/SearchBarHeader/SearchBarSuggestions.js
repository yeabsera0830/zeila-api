import React, { Component, Fragment } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import sceneKeys from '../../../values/sceneKeys';
import coreState from '../../../../core/states/suggestions';
import coreSearchState from '../../../../core/states/search';
import coreHeaderFooterState from '../../../../core/states/headerFooter';
import colors from '../../../values/colors';

class SearchBarSuggestions extends Component {
    state = { suggestions: coreState.value };

    componentDidMount() {
        coreState.registerListener(this.onSuggestionsChangeListener);
    }

    componentWillUnmount() {
        coreState.unregisterListener(this.onSuggestionsChangeListener);
    }

    onSuggestionsChangeListener = (suggestions) => this.setState({ suggestions })

    onSuggestionPress = (id, name) => {
        coreSearchState.selectedBusinessId.value = id;
        coreHeaderFooterState.header.searchBarDefaultText.value = name;
        coreState.value = [];
        Actions[sceneKeys.MAIN.BUSINESS_PROFILE]();
    }

    render() {
        const { suggestions } = this.state;
        return (suggestions.length > 0 ?
            <View style={{ ...styles.container, top: this.props.top }}>
                <ScrollView style={styles.suggestions} keyboardShouldPersistTaps='handled'>
                    {suggestions.map(({ id, name }) => (
                        <TouchableOpacity
                            key={`${id}`}
                            onPress={() => this.onSuggestionPress(id, name)}
                            style={styles.suggestion}
                        >
                            <Text style={styles.suggestionText}>
                                {name}
                            </Text>
                        </TouchableOpacity>))}
                </ScrollView>
            </View> : <Fragment />
        );
    }
}

const MINIMAL_SPACE = 5;
const MODERATE_SPACE = 10;
const BORDER_RADIUS = 20;
const FONT_SIZE = 20;
const ELEVATION = 30;
const Z_INDEX = 10;

const styles = {
    container: {
        position: 'absolute',
        width: '100%',
        elevation: ELEVATION,
        zIndex: Z_INDEX,
        borderBottomLeftRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
        backgroundColor: colors.theme.LIGHT
    },
    suggestions: {
        width: '100%',
        paddingBottom: MINIMAL_SPACE
    },
    suggestion: {
        width: '100%',
        paddingVertical: MINIMAL_SPACE,
        paddingHorizontal: MODERATE_SPACE
    },
    suggestionText: {
        fontSize: FONT_SIZE
    }
};

export { SearchBarSuggestions };