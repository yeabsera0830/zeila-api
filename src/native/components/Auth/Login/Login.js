import React, { Component } from 'react';
import { Alert, Linking, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Icon } from '../../common';
import sceneKeys from '../../../values/sceneKeys';
import { loginWithFb, login } from '../../../../core/useCases/auth';
import links from '../../../../core/values/links';
import types from '../../../../core/useCases/types';
import strings from '../../../../common/values/strings';
import icons from '../../../values/icons';
import styles from './styles';

class Login extends Component {
    state = { phoneNumber: '', password: '', loginButtonEnabled: false, loginLoading: false };

    onLoginWithFbPress = async () => {
        const response = await loginWithFb();
        this.onLoginResolved(response);
    }

    onLoginPress = async () => {
        this.setState({ loginLoading: true });
        const response = await login(this.state.phoneNumber, this.state.password);
        this.setState({ loginLoading: false });
        this.onLoginResolved(response);
    }

    onLoginResolved = (response) => {
        if (response.status === types.SUCCESS)
            Actions.reset(sceneKeys.MAIN.ROOT);
        else
            Alert.alert(strings.loginFailed, response.message);
    }

    onForgotPasswordPress = () => Linking.openURL(links.PASSWORD_RECOVERY)

    onPhoneNumberChange = (value) => this.onInputChange('phoneNumber', value)

    onPasswordChange = (value) => this.onInputChange('password', value)

    onInputChange = (key, value) => this.setState({ [key]: value }, this.maintainButtonEnabledState)

    maintainButtonEnabledState = () => this.setState({ loginButtonEnabled: this.shouldEnableButton() })

    shouldEnableButton = () => {
        const { phoneNumber, password } = this.state;
        return !!phoneNumber && !!password;
    }

    render() {
        const { phoneNumber, password, loginButtonEnabled, loginLoading } = this.state;
        return (
            <View style={styles.container}>
                <Button
                    icon={<Icon icon={icons.facebook} style={styles.fbIcon} />}
                    title={strings.loginWithFb}
                    onPress={this.onLoginWithFbPress}
                    buttonStyle={styles.loginWithFbButton}
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
                <Text onPress={this.onForgotPasswordPress} style={styles.forgotPassword}>
                    {strings.forgotPassword}
                </Text>
                <Button
                    disabled={!loginButtonEnabled || loginLoading}
                    loading={loginLoading}
                    title={strings.login}
                    onPress={this.onLoginPress}
                    buttonStyle={styles.loginButton}
                    disabledStyle={loginLoading ? styles.loginButton : styles.loginButtonDisabled}
                    titleStyle={styles.loginButtonText}
                    loadingProps={styles.loginButtonActivityIndicator}
                />
            </View>
        );
    }
}

export { Login };