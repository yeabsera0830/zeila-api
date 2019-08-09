import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Badge, Icon, Toast } from '../../common';
import colors from '../../../values/colors';

const SearchBarIcon = ({ isActive, onPress, icon, title, badgeValue }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={() => Toast.show(title)}>
            <Icon
                icon={icon}
                style={isActive ? styles.iconActive : styles.icon}
                containerStyle={styles.iconContainer}
            />
            {!isActive && badgeValue > 0 ?
                <Badge
                    value={badgeValue}
                    backgroundColor={styles.badgeBackgroundColor}
                /> :
                null}
        </TouchableOpacity>
    );
};

const MINIMAL_SPACE = 10;
const icon = {
    fontSize: 30
};

const styles = {
    container: {
        justifyContent: 'center'
    },
    iconContainer: {
        marginHorizontal: MINIMAL_SPACE
    },
    icon: {
        ...icon,
        color: colors.theme.MAIN_DARK
    },
    iconActive: {
        ...icon,
        color: colors.theme.LIGHT
    },
    badgeBackgroundColor: colors.theme.MAIN_SLIGHTLY_DARK
};

export { SearchBarIcon };