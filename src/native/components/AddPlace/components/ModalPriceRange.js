import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    Picker
} from "react-native"
import { Overlay } from "react-native-elements"
import styles from "./style"
import priceRanges from "./priceRanges"

export default class MyPopup extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
            selectedID: priceRanges[0]['id'],
            selectedValue: priceRanges[0]['value']
        }
    }

    render() {
        if (this.props.visible) {
            const labels = priceRanges.map(item => (
                <Picker.Item key={item.id} label={item.value} value={item.value} />
            ))
            return (
                <Overlay
                    isVisible={this.props.visible}
                    onBackdropPress={this.props.modalHandler}
                    animationType="slide"
                    overlayStyle={styles.overlayBottom}
                >
                    <View style={styles.selectors}>
                        <Text style={styles.modalTitle}>Select a price range</Text>
                        <Picker
                            selectedValue={this.state.selectedValue}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedValue: itemValue, selectedID: itemIndex })}
                        >
                            {labels}
                        </Picker>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalOk} onPress={() => this.props.okHandler(this.state.selectedID, this.state.selectedValue)}>
                                <Text style={styles.modalOkText}>Okay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalCancel} onPress={this.props.modalHandler}>
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