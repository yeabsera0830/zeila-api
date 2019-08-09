import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity
} from "react-native"
import { Overlay } from "react-native-elements"
import styles from "./style"
import DateTimePicker from "react-native-modal-datetime-picker"

export default class MyPopup extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
            openingTimeVisible: false,
            closingTimeVisible: false,
            openingTime: '8:30 AM',
            closingTime: '12:30 PM'
        }
        this.handleTime = this.handleTime.bind(this)
    }

    handleTime(key, value) {
        const date = new Date(value)
        var hour = null
        var timeOfDay = null
        if (date.getHours() < 12 && date.getHours() >= 0) {
            if (date.getHours() === 0) {
                hour = 12
            } else {
                hour = date.getHours()
            }
            timeOfDay = "AM"
        } else {
            if (date.getHours() === 12) {
                hour = 12
            } else {
                hour = date.getHours() - 12
            }
            timeOfDay = "PM"
        }

        var minute = null
        if (date.getMinutes() < 10) {
            minute = "0" + date.getMinutes()
        } else {
            minute = date.getMinutes()
        }

        const formattedTime = hour + ":" + minute + " " + timeOfDay
        const visible = key + 'Visible'
        this.setState({ [key]: formattedTime, [visible]: !this.state[visible] })
    }

    submitFormatedTime() {
        const { openingTime, closingTime } = this.state
        const stringTime = openingTime + " to " + closingTime
        this.props.okHandler(`openingTime: ${openingTime}, closingTime: ${closingTime}`, stringTime)
    }

    render() {
        if (this.props.visible) {
            return (
                <Overlay
                    isVisible={this.props.visible}
                    onBackdropPress={this.props.modalHandler}
                    animationType="slide"
                    overlayStyle={styles.overlayBottomBig}
                >
                    <View style={styles.selectors}>
                        <Text style={[styles.modalTitle, { marginBottom: 20 }]}>Please select opening and closing time</Text>
                        <View style={styles.timeBox}>
                            <Text style={[styles.label, { marginBottom: 20, marginTop: 3 }]}>Opening Time</Text>
                            <TouchableOpacity onPress={() => this.setState({ openingTimeVisible: !this.state.openingTimeVisible })}>
                                <Text style={styles.timeText}>{this.state.openingTime}</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            is24Hour={false}
                            mode="time"
                            timePickerModeAndroid="spinner"
                            isVisible={this.state.openingTimeVisible}
                            onConfirm={value => this.handleTime('openingTime', value)}
                            onCancel={() => this.setState({ openingTimeVisible: !this.state.openingTimeVisible })}
                        />
                        <View style={styles.timeBox}>
                            <Text style={[styles.label, { marginBottom: 20, marginTop: 3 }]}>Closing Time</Text>
                            <TouchableOpacity onPress={() => this.setState({ closingTimeVisible: !this.state.closingTimeVisible })}>
                                <Text style={styles.timeText}>{this.state.closingTime}</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            is24Hour={false}
                            mode="time"
                            timePickerModeAndroid="spinner"
                            isVisible={this.state.closingTimeVisible}
                            onConfirm={value => this.handleTime('closingTime', value)}
                            onCancel={() => this.setState({ closingTimeVisible: !this.state.closingTimeVisible })}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalOk} onPress={() => this.submitFormatedTime()}>
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