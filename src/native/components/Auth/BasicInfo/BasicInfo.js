import React, { Component, Fragment } from 'react';
import { Image, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Actions } from 'react-native-router-flux';
import { Button, Overlay } from 'react-native-elements';
import { Icon, Toast } from '../../common';
import { saveBasicInfo, requestCameraPermissions } from '../../../../core/useCases/auth';
import coreState from '../../../../core/states/auth';
import sceneKeys from '../../../values/sceneKeys';
import strings from '../../../../common/values/strings';
import styles from './styles';
import types from '../../../../core/useCases/types';
import icons from '../../../values/icons';

class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.genericImageSrc = require('../../../../../assets/default_profile_pic.png');
        this.state = { url: '', name: '', imageSrc: this.genericImageSrc, isOverlayVisible: false, saving: false };
    }

    onUploadPhotoPress = () => this.setState({ isOverlayVisible: true })

    onCameraPress = () => this.onUploadPhotoOptionPress()

    onStoragePress = () => this.onUploadPhotoOptionPress(true)

    onUploadPhotoOptionPress = async (isFromStorage) => {
        this.setState({ isOverlayVisible: false });
        if (!(await requestCameraPermissions()))
            return;
        const { cancelled, uri } = isFromStorage ?
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true
            }) : await ImagePicker.launchCameraAsync({ allowsEditing: true });
        if (cancelled)
            return;
        const formattedURI = Platform.OS === 'android' ? uri : uri.replace('file://', '');
        this.setState({ url: formattedURI, imageSrc: { uri: formattedURI } });
    }

    dismissPopup = () => this.setState({ isOverlayVisible: false })

    onNameChange = (name) => this.setState({ name })

    saveBasicInfo = async () => {
        this.setState({ saving: true });
        const { type, message } = await saveBasicInfo(this.state.name, this.state.url);
        this.setState({ saving: false });
        if (type === types.SUCCESS) {
            if (coreState.basicInfo.isFirstTime)
                Actions.reset(sceneKeys.MAIN.ROOT);
            else
                Actions.pop();
            Toast.show(strings.successfullySaved);
        } else {
            Toast.show(message);
        }
    }

    render() {
        const { url, name, imageSrc, isOverlayVisible, saving } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.pictureContainer}>
                    <Image source={imageSrc} style={styles.profilePicture} />
                    {url ? null : <Fragment>
                        <View style={styles.translucent} />
                        <TouchableOpacity style={styles.uploadPhotoContainer} onPress={this.onUploadPhotoPress}>
                            <Icon icon={icons.uploadPhoto} style={styles.uploadPhotoIcon} />
                        </TouchableOpacity>
                    </Fragment>}
                </View>
                <Overlay
                    isVisible={isOverlayVisible}
                    height='auto'
                    width='auto'
                    onBackdropPress={this.dismissPopup}
                >
                    <View style={styles.overlayContainer}>
                        <TouchableOpacity onPress={this.onCameraPress} style={styles.overlayIconContainer}>
                            <Icon icon={icons.camera} style={styles.overlayIcon} />
                            <Text>{strings.takeFromCamera}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onStoragePress} style={styles.overlayIconContainer}>
                            <Icon icon={icons.storage} style={styles.overlayIcon} />
                            <Text>{strings.pickFromStorage}</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={this.state.name}
                        onChangeText={this.onNameChange}
                        placeholder={strings.insertName}
                        placeholderTextColor={styles.inputPlaceholderTextColor}
                        style={styles.input}
                    />
                </View>
                <Button
                    disabled={!url || !name || saving}
                    loading={saving}
                    title={strings.save}
                    onPress={this.saveBasicInfo}
                    buttonStyle={styles.button}
                    disabledStyle={saving ? styles.button : styles.buttonDisabled}
                    titleStyle={styles.buttonText}
                    loadingProps={styles.buttonActivityIndicator}
                />
            </View>
        );
    }
}

export { BasicInfo };