import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SearchBarHeader } from '../recurring';
import { Setting } from './Setting';
import coreAuthState from '../../../core/states/auth';
import { logout } from '../../../core/useCases/auth';
import sceneKeys from '../../values/sceneKeys';
import strings from '../../../common/values/strings';
import icons from '../../values/icons';
import styles from './styles';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.settings = [
            { icon: icons.changeBasicInfo, text: strings.changeBasicInfo, onPress: this.onChangeBasicInfoPress },
            { icon: icons.logout, text: strings.logout, onPress: this.onLogoutPress }
        ];
    }

    onLogoutPress = async () => {
        await logout();
        Actions.reset(sceneKeys.AUTH.ROOT);
    }

    onChangeBasicInfoPress = () => {
        coreAuthState.basicInfo.isFirstTime = false;
        Actions[sceneKeys.BASIC_INFO]();
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBarHeader />
                <View style={styles.content}>
                    {this.settings.map(({ icon, text, onPress }) =>
                        <Setting key={text} icon={icon} text={text} onPress={onPress} />)}
                </View>
            </View>
        );
    }
}

export { Settings };