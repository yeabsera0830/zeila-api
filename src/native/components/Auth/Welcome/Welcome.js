import React from 'react';
import { Image, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import sceneKeys from '../../../values/sceneKeys';
import strings from '../../../../common/values/strings';
import styles from './styles';

const Welcome = () => {
    return (
        <View style={{ flex: 1 }}>
            <Image
                source={require('../../../../../assets/icon.png')}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.welcomeText}>
                    {strings.welcomeMessage}
                </Text>
                <Button
                    title={strings.createAccount}
                    onPress={Actions[sceneKeys.AUTH.SIGNUP]}
                    buttonStyle={styles.createAccountButton}
                    titleStyle={styles.buttonText}
                />
                <Text style={styles.alreadyAUserText}>
                    {strings.alreadyAUser}
                </Text>
                <Button
                    title={strings.login}
                    onPress={Actions[sceneKeys.AUTH.LOGIN]}
                    buttonStyle={styles.loginButton}
                    titleStyle={styles.buttonText}
                />
            </View>
        </View>
    );
};

export { Welcome };