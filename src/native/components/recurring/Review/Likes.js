import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../common';
import strings from '../../../../common/values/strings';
import icons from '../../../values/icons';
import colors from '../../../values/colors';

const Likes = ({ value, liked, onLikePress }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onLikePress}>
            <Icon icon={liked ? icons.liked : icons.notLiked} style={styles.icon} />
        </TouchableOpacity>
        <Text onPress={onLikePress} style={styles.text}>
            {value ?
                (value === 1 ? strings.oneLike : `${value} ${strings.likes}`) :
                strings.noLikes}
        </Text>
    </View>
);

const MINIMAL_SPACE = 5;
const MODERATE_SPACE = 10;
const styles = {
    container: {
        marginVertical: MODERATE_SPACE,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: colors.theme.MAIN
    },
    text: {
        marginLeft: MINIMAL_SPACE
    }
};

export { Likes };