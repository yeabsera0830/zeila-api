import React, { Component } from 'react';
import { Keyboard, LayoutAnimation, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Icon, Toast } from '../common';
import strings from '../../../common/values/strings';
import icons from '../../values/icons';
import colors from '../../values/colors';
import dimensions from '../../values/dimensions';

class ReviewFooter extends Component {
    state = { inputText: '', bottomPosition: 0, isOverlayVisible: false, reviewedByMe: false };

    componentDidMount() {
        this.keyboardDidShowListener =
            Keyboard.addListener('keyboardDidShow', e => this.onInputFocusSwitch(e.endCoordinates.height));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onInputFocusSwitch);
        this.setState({ reviewedByMe: this.props.reviewedByMe });
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onInputFocusSwitch = (keyboardHeight) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ bottomPosition: keyboardHeight || 0 });
    }

    onChangeText = (text) => this.setState({ inputText: text });

    onUploadPhotoPress = () => {
        Keyboard.dismiss();
        this.setState({ isOverlayVisible: true });
    }

    onCameraPress = () => {
        this.setState({ isOverlayVisible: false });
        this.props.onCameraPress();
    }

    onStoragePress = () => {
        this.setState({ isOverlayVisible: false });
        this.props.onStoragePress();
    }

    dismissPopup = () => this.setState({ isOverlayVisible: false })

    onSendPress = () => this.props.onSendPress(this.state.inputText, () =>
        this.setState({ inputText: '', reviewedByMe: true }))

    onReadGuidelinesLongPress = () => Toast.show(strings.readReviewGuidelines)

    onCameraLongPress = () => Toast.show(strings.uploadMedia)

    onSendLongPress = () => Toast.show(strings.sendReview)

    render() {
        const { inputText, bottomPosition, isOverlayVisible, reviewedByMe } = this.state;
        const containerStyle = { ...styles.container, bottom: bottomPosition };
        const overlayStyle = {
            ...styles.overlay,
            bottom: bottomPosition + dimensions.businessProfileReviewFooterHeight + MINIMAL_SPACE
        };
        return (
            <View style={containerStyle}>
                <TouchableOpacity
                    onPress={this.onUploadPhotoPress}
                    onLongPress={this.onCameraLongPress}
                    style={styles.iconContainer}
                >
                    <Icon icon={icons.uploadPhoto} style={styles.icon} />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <TextInput
                        editable={!reviewedByMe}
                        value={inputText}
                        multiline
                        placeholder={strings.writeAReviewPlaceholder}
                        onChangeText={this.onChangeText}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity
                    onPress={this.props.onReadGuidelinesPress}
                    onLongPress={this.onReadGuidelinesLongPress}
                    style={styles.iconContainer}
                >
                    <Icon icon={icons.readReviewGuidelines} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!inputText}
                    onPress={this.onSendPress}
                    onLongPress={this.onSendLongPress}
                    style={styles.iconContainer}
                >
                    <Icon icon={icons.send} style={inputText.trim() ? styles.icon : styles.iconDisabled} />
                </TouchableOpacity>
                <Overlay
                    isVisible={isOverlayVisible}
                    height='auto'
                    width='auto'
                    onBackdropPress={this.dismissPopup}
                    overlayStyle={overlayStyle}
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
            </View>);
    }
}

const MINIMAL_SPACE = 5;
const MODERATE_SPACE = 10;
const FONT_SIZE = 18;
const ICON_SIZE = 35;
const icon = {
    color: colors.theme.MAIN_DARK,
    fontSize: ICON_SIZE
};

const styles = {
    container: {
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        height: dimensions.businessProfileReviewFooterHeight,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.theme.LIGHT,
        borderTopWidth: 1,
        borderColor: colors.theme.FADED
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    icon: {
        color: colors.theme.MAIN_DARK,
        fontSize: ICON_SIZE
    },
    iconDisabled: {
        ...icon,
        color: colors.theme.FADED
    },
    inputContainer: {
        flex: 5,
        marginHorizontal: MINIMAL_SPACE,
        paddingVertical: MODERATE_SPACE
    },
    input: {
        paddingLeft: MINIMAL_SPACE,
        fontSize: FONT_SIZE
    },
    overlay: {
        position: 'absolute',
        left: MODERATE_SPACE
    },
    overlayContainer: {
        flexDirection: 'row'
    },
    overlayIconContainer: {
        margin: MODERATE_SPACE,
        alignItems: 'center'
    },
    overlayIcon: {
        ...icon
    }
};

export { ReviewFooter };