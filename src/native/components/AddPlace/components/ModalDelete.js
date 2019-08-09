import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    BackHandler
} from "react-native"
import { Overlay } from "react-native-elements"
import styles from "./style"

export default class MyPopup extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible
        }
    }

    render() {
        if (this.props.visible) {
            return (
                <Overlay
                    isVisible={this.props.visible}
                    onBackdropPress={this.props.modalHandler}
                    animationType="slide"
                    overlayStyle={styles.overlayBottomLittle}
                >
                    <View style={styles.uploadSelectors}>
                        <Text style={styles.modalTitle}>Remove photo from selection</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalOk} onPress={this.props.yesHandler}>
                                <Text style={styles.modalOkText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalCancel} onPress={this.props.noHandler}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Overlay>
            )
        } else {
            return (
                <View></View>
            )
        }
    }}