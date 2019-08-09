import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from '../common';
import styles from './styles';

const Setting = ({ icon, text, onPress }) => {
    return (
        <TouchableOpacity style={styles.setting.container} onPress={onPress}>
            <Icon icon={icon} style={styles.setting.icon} />
            <Text style={styles.setting.text}>{text}</Text>
        </TouchableOpacity>);
};

export { Setting };