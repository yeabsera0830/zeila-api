import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity
} from "react-native"
import styles from "./style"

export default class Header extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const back = "<"
        return (
            <View style={styles.Header}>
                <TouchableOpacity onPress={() => alert("Back Button")}>
                    <Image source={require('../../../../../assets/back.png')} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.HeaderText}>Add a place</Text>
            </View>    
        )
    }
}