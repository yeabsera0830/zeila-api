import React from 'react';
import { Image, View } from 'react-native';
import { SearchBarHeader } from '../recurring';
import styles from './styles';

const Profile = () => {
    return (
        <View style={styles.container}>
            <SearchBarHeader />
            <View style={styles.content}>
                <Image source={require('../../../../assets/in_progress.jpg')} style={styles.inProgress} />
            </View>
        </View>
    );
};

export { Profile };