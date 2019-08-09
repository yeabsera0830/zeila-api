import React from 'react';
import { Text, View } from 'react-native';
import colors from '../../values/colors';

const Badge = ({ value, backgroundColor }) => {
    const width = FONT_SIZE + (FONT_SIZE * (value.toString()).length / 4);
    const containerStyle = backgroundColor ?
        { ...styles.container, width, backgroundColor } :
        { ...styles.container, width };
    return (
        <View style={containerStyle}>
            <Text style={styles.text}>{value}</Text>
        </View>
    );
};

const FONT_SIZE = 18;
const BADGE_HEIGHT = FONT_SIZE * 1.25;
const styles = {
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: BADGE_HEIGHT,
        borderRadius: BADGE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.theme.MAIN
    },
    text: {
        color: colors.theme.LIGHT,
        fontSize: FONT_SIZE
    }
};

export { Badge };