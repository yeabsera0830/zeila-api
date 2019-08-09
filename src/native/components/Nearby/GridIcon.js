import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Badge, Icon } from '../common';
import colors from '../../values/colors';

const GridIcon = ({ text, count, icon, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress.bind(this)}>
            <View>
                <Icon icon={icon} style={styles.icon} />
                {count > 0 ? <Badge value={count} backgroundColor={styles.badgeBackgroundColor} /> : null}
            </View>
            {text ?
                <Text adjustsFontSizeToFit style={styles.text}>
                    {text}
                </Text>
                : null}
        </TouchableOpacity>);
};

const ICON_SIZE = 60;

const styles = {
    container: {
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        color: colors.theme.MAIN_DARK,
        fontSize: ICON_SIZE
    },
    badgeBackgroundColor: colors.theme.MAIN,
    text: {
        color: colors.theme.MAIN_DARK
    }
};

export { GridIcon };