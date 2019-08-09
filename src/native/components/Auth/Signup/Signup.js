import React, { Component } from 'react';
import { Alert, Linking, Text, TextInput, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Icon } from '../../common';
import sceneKeys from '../../../values/sceneKeys';
import { signup, signupWithFb } from '../../../../core/useCases/auth';
import coreState from '../../../../core/states/auth';
import links from '../../../../core/values/links';
import types from '../../../../core/useCases/types';
import strings from '../../../../common/values/strings';
import icons from '../../../values/icons';
import styles from './styles';

class Signup extends Component {
    state = {
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        legalConditionsAccepted: false,
        signupButtonEnabled: false,
        signupLoading: false
    };

    onSignupWithFbPress = async () => {
        if (!this.state.legalConditionsAccepted) {
            Alert.alert(strings.signupFailed, strings.acceptLegalConditions);
            return;
        }
        const response = await signupWithFb();
        if (response.status === types.SUCCESS)
            Actions.reset(sceneKeys.MAIN.ROOT);
        else
            Alert.alert(strings.signupFailed, response.message);
    }

    onSignupPress = async () => {
        this.setState({ signupLoading: true });
        const response = await signup(this.state.phoneNumber, this.state.password, this.state.confirmPassword);
        this.setState({ signupLoading: false });
        if (response.status === types.SUCCESS) {
            coreState.basicInfo.isFirstTime = true;
            Actions.reset(sceneKeys.BASIC_INFO);
        } else {
            Alert.alert(strings.signupFailed, response.message);
        }
    }

    onTermsOfServicePress = () => Linking.openURL(links.TERMS_OF_SERVICE)

    onPrivacyConditionsPress = () => Linking.openURL(links.PRIVACY_CONDITIONS)

    onPhoneNumberChange = (value) => this.onInputChange('phoneNumber', value)

    onPasswordChange = (value) => this.onInputChange('password', value)

    onConfirmPasswordChange = (value) => this.onInputChange('confirmPassword', value)

    onLegalCheckBoxChange = () => this.onInputChange('legalConditionsAccepted', !this.state.legalConditionsAccepted)

    onInputChange = (key, value) => this.setState({ [key]: value }, this.maintainButtonEnabledState)

    maintainButtonEnabledState = () => this.setState({ signupButtonEnabled: this.shouldEnableButton() })

    shouldEnableButton = () => {
        const { phoneNumber, password, confirmPassword, legalConditionsAccepted } = this.state;
        return !!phoneNumber && !!password && !!confirmPassword && legalConditionsAccepted;
    }

    render() {
        const {
            phoneNumber, password, confirmPassword, legalConditionsAccepted, signupButtonEnabled, signupLoading
        } = this.state;
        return (
            <View style={styles.container}>
                <Button
                    icon={<Icon icon={icons.facebook} style={styles.fbIcon} />}
                    title={strings.signupWithFb}
                    onPress={this.onSignupWithFbPress}
                    buttonStyle={styles.signupWithFbButton}
                    titleStyle={styles.fbButtonText}
                />
                <Text style={styles.orText}>
                    {strings.or}
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        keyboardType='phone-pad'
                        value={phoneNumber}
                        onChangeText={this.onPhoneNumberChange}
                        placeholder={strings.phoneNumberInputPlaceholder}
                        placeholderTextColor={styles.inputPlaceholderTextColor}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        secureTextEntry
                        value={password}
                        onChangeText={this.onPasswordChange}
                        placeholder={strings.passwordInputPlaceholder}
                        placeholderTextColor={styles.inputPlaceholderTextColor}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={this.onConfirmPasswordChange}
                        placeholder={strings.confirmPasswordPlaceholder}
                        placeholderTextColor={styles.inputPlaceholderTextColor}
                        style={styles.input}
                    />
                </View>
                <Button
                    disabled={!signupButtonEnabled || signupLoading}
                    loading={signupLoading}
                    title={strings.signup}
                    onPress={this.onSignupPress}
                    buttonStyle={styles.signupButton}
                    disabledStyle={signupLoading ? styles.signupButton : styles.signupButtonDisabled}
                    titleStyle={styles.signupButtonText}
                    loadingProps={styles.signupButtonActivityIndicator}
                />
                <View style={styles.termsOfServiceContainer}>
                    <CheckBox
                        onPress={this.onLegalCheckBoxChange}
                        checked={legalConditionsAccepted}
                        containerStyle={styles.checkBoxContainerStyle}
                        checkedColor={styles.termsOfServiceCheckboxColor}
                        uncheckedColor={styles.termsOfServiceCheckboxColor}
                    />
                    <Text style={styles.acceptLegalConditionsText}>
                        {`${strings.acceptLegal} `}
                        <Text style={styles.legalConditionsButtonText}>
                            {strings.termsOfService}
                        </Text>
                        {` ${strings.and} `}
                        <Text style={styles.legalConditionsButtonText}>
                            {strings.privacyConditions}
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }
}

export { Signup };