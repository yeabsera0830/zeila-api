import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native"
import { Overlay } from "react-native-elements"
import styles from "./style"

export default class MyPopup extends PureComponent {
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
                    overlayStyle={styles.overlayBottom}
                >
                    <View style={styles.selectorsImage}>
                        <View style={styles.modalTop}>
                            <Text style={styles.modalTitle}>Select Image from</Text>
                        </View>
                        <TouchableOpacity style={styles.selectorItems} onPress={this.props.fromCamera}>
                            <Image source={require('../../../../../assets/camera.png')} style={styles.uploadImage}/>
                            <Text style={styles.selectorText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectorItems} onPress={this.props.fromGallery}>
                            <Image source={require('../../../../../assets/gallery.png')} style={styles.uploadImage}/>
                            <Text style={styles.selectorText}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
            )
        } else {
            return (
                <View></View>
            )
        }
    }}