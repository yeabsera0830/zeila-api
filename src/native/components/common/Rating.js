import React, { Component, Fragment } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Rating as NativeRating, AirbnbRating } from 'react-native-elements';
import strings from '../../../common/values/strings';
import colors from '../../values/colors';

class Rating extends Component {
    removeMyRating = () => this.props.onFinishRating(0)

    renderDisabledRating = () => {
        return (
            <NativeRating
                readonly
                startingValue={this.props.rating || 0}
                type='custom'
                imageSize={ICON_SIZE}
                ratingColor={styles.iconColorRated}
                ratingBackgroundColor={styles.iconColorUnrated}
                style={styles.ratingContainer}
            />);
    }

    renderEnabledRating = () => {
        const { rating, onFinishRating } = this.props;
        return (
            <AirbnbRating
                showRating={false}
                defaultRating={rating || 0}
                onFinishRating={onFinishRating}
                selectedColor={styles.iconColorRated}
                style={styles.ratingContainer}
            />
        );
    }

    render() {
        const { readonly, rating, numberOfRatings, showDetails } = this.props;
        return (
            <View style={styles.container}>
                {readonly ?
                    (rating > 0 ? <Fragment>
                        {this.renderDisabledRating()}
                        {showDetails && numberOfRatings > 0 ? <Text>{`${rating}(${numberOfRatings})`}</Text> : null}
                    </Fragment> : <Text style={styles.noRatings}>{strings.noRatings}</Text>) :
                    <Fragment>
                        <Text style={styles.rate}>
                            {rating > 0 ? strings.youHaveRatedThisPlace : strings.rateAPlace}
                        </Text>
                        <View style={styles.enabledRatingContainer}>
                            {this.renderEnabledRating()}
                            {rating > 0 ?
                                <TouchableOpacity onPress={this.removeMyRating}>
                                    <Text style={styles.removeMyRating}>{strings.removeMyRating}</Text>
                                </TouchableOpacity> : null}
                        </View>
                    </Fragment>}
            </View>);
    }
}

const MINIMAL_SPACE = 5;
const fontSize = {
    rate: 22,
    unrate: 18
};
const ICON_COLOR_UNRATED = '#EEEEEE';
const ICON_SIZE = 18;

const styles = {
    container: {
        alignItems: 'center'
    },
    ratingContainer: {
        margin: MINIMAL_SPACE
    },
    enabledRatingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: colors.theme.MAIN
    },
    iconColorRated: colors.theme.MAIN,
    iconColorUnrated: ICON_COLOR_UNRATED,
    rate: {
        fontSize: fontSize.rate,
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        alignSelf: 'flex-start'
    },
    removeMyRating: {
        marginLeft: MINIMAL_SPACE,
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: fontSize.unrate
    },
    noRatings: {
        color: colors.theme.FADED
    }
};

export { Rating };