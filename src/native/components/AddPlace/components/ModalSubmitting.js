import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ProgressBarAndroid
} from "react-native"
import styles from "./style"
import { Overlay } from "react-native-elements"

export default class MyPopup extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        if (this.props.visible) {
            return (
                <Overlay
                    isVisible={this.props.visible}
                    onBackdropPress={this.props.modalHandler}
                    animationType="fade"
                    overlayStyle={styles.overlayMiddleLittle}
                >
                    <View style={styles.selectorsProgress}>
                        <ProgressBarAndroid />
                        <Text style={[styles.modalTitle, { marginTop: 13 }]}>Uploading Place</Text>
                    </View>
            </Overlay>
            )
        } else {
            return (
                <View></View>
            )
        }
    }}