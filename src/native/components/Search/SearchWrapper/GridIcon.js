import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../../common';
import styles from './styles';

const GridIcon = ({ text, icon, onPress, isEmpty }) => {
    if (isEmpty)
        return <View style={styles.gridIcon.container} />;
    return (
        <TouchableOpacity style={styles.gridIcon.container} onPress={onPress.bind(this)}>
            <Icon icon={icon} style={styles.gridIcon.icon} />
            <Text adjustsFontSizeToFit style={styles.gridIcon.text}>{text}</Text>
        </TouchableOpacity>);
};

export { GridIcon };