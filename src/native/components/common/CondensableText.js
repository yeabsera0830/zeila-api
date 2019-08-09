import React, { Component } from 'react';
import { LayoutAnimation, Text, UIManager } from 'react-native';
import strings from '../../../common/values/strings';
import colors from '../../values/colors';

class CondensableText extends Component {
    state = { isAbridged: true, text: '' };
    componentDidMount() {
        const { text, numOfCharactersForAbridged } = this.props;
        if (text.length > numOfCharactersForAbridged + strings.elipsis.length)
            this.setState({ text: text.substring(0, numOfCharactersForAbridged), isAbridged: true });
        else
            this.setState({ text, isAbridged: false });
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    onReadMore = () => {
        LayoutAnimation.spring();
        this.setState({ text: this.props.text, isAbridged: false });
    }

    render() {
        const { readMoreText } = this.props;
        const { text, isAbridged } = this.state;
        return (
            <Text style={this.props.style}>
                {`${text.trim()}${isAbridged ? strings.elipsis : ''}`}
                {isAbridged ?
                    <Text style={styles.readMoreText} onPress={this.onReadMore}> {readMoreText}</Text> : ''}
            </Text>
        );
    }
}

const styles = {
    readMoreText: {
        color: colors.theme.FADED
    }
};

export { CondensableText };