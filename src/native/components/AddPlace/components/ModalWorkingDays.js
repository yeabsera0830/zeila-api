import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    CheckBox
} from "react-native"
import { Overlay } from "react-native-elements"
import workingDays from "./workingDays"
import styles from "./style"

export default class MyPopup extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
            checked: [],
            selectedIDs: [],
            selectedValues: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        var checked = this.state.checked
        workingDays.forEach(item => {
            checked.push(false)
        })
        this.setState({ checked })
    }

    handleClick(id, value) {
        const index = this.state.selectedIDs.indexOf(id)
        var selectedIDs = this.state.selectedIDs
        if (index < 0) {
            selectedIDs.push(id)
        } else {
            selectedIDs.splice(index, 1)
        }
        selectedIDs.sort()
        var checked = this.state.checked
        checked[id] = !checked[id]
        this.setState({  selectedIDs, checked })
    }

    render() {
        if (this.props.visible) {
            const labels = workingDays.map(item => (
                <View key={item.id} style={{ flexDirection: "row" }}>
                    <CheckBox
                        value={this.state.checked[item.id]}
                        onValueChange={() => this.handleClick(item.id, item.value)}
                    />
                    <Text style={{ marginTop: 5 }}>{item.value}</Text>
                </View>
            ))
            return (
                <Overlay
                    isVisible={this.props.visible}
                    onBackdropPress={this.props.modalHandler}
                    animationType="slide"
                    overlayStyle={styles.overlayMiddle}
                >
                    <View style={styles.selectors}>
                        <Text style={styles.modalTitle}>Select the days which the place is open</Text>
                        <View style={{ flexDirection: "column" }}>
                            {labels}
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalOk} onPress={() => this.props.okHandler(this.state.selectedIDs)}>
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