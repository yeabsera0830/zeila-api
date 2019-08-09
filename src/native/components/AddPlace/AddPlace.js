import React from 'react';
import { Image, View } from 'react-native';
import { SearchBarHeader } from '../recurring';
import styles from './styles';
import AddPlaceView from "./components/AddPlace"

const AddPlace = () => {
    return (
        <View style={styles.container}>
            <AddPlaceView />
        </View>
    );
};

export { AddPlace };