import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, Toast } from '../../common';
import sceneKeys from '../../../values/sceneKeys';
import coreState from '../../../../core/states/headerFooter';
import strings from '../../../../common/values/strings';
import icons from '../../../values/icons';
import styles from './styles';

class NavFooter extends Component {
    state = { activeIndex: coreState.footer.activeIndex.value, shouldDisplay: coreState.footer.shouldDisplay.value };

    ITEMS = [
        { icon: icons.nearby, sceneKey: sceneKeys.MAIN.NEARBY, title: strings.nearby },
        { icon: icons.search, sceneKey: sceneKeys.MAIN.SEARCH, title: strings.search },
        { icon: icons.addPlace, sceneKey: sceneKeys.MAIN.ADD_PLACE, title: strings.addAPlace },
        { icon: icons.profile, sceneKey: sceneKeys.MAIN.PROFILE, title: strings.myProfile },
        { icon: icons.settings, sceneKey: sceneKeys.MAIN.SETTINGS, title: strings.settings }
    ];

    componentDidMount() {
        coreState.footer.activeIndex.registerListener(this.onActiveIndexChangeListener);
        coreState.footer.shouldDisplay.registerListener(this.onShouldDisplayChangeListener);
    }

    componentWillUnmount() {
        coreState.footer.activeIndex.unregisterListener(this.onActiveIndexChangeListener);
        coreState.header.shouldDisplay.unregisterListener(this.onShouldDisplayChangeListener);
    }

    onActiveIndexChangeListener = (activeIndex) => {
        this.setState({ activeIndex });
        if (activeIndex !== -1)
            coreState.header.activeIndex.value = -1;
    }

    onShouldDisplayChangeListener = (shouldDisplay) => {
        this.setState({ shouldDisplay });
    }

    pushComponent = ({ sceneKey }) => {
        if (Actions.currentScene !== sceneKey)
            Actions[sceneKey]();
    }

    onItemLongPress = ({ title }) => Toast.show(title)

    render() {
        return (coreState.footer.shouldDisplay.value ?
            <View style={styles.container}>
                {this.ITEMS.map((item, index) =>
                    <TouchableOpacity
                        key={index}
                        onPress={() => this.pushComponent(item)}
                        onLongPress={() => this.onItemLongPress(item)}
                        style={styles.item}
                    >
                        <Icon
                            icon={item.icon}
                            style={index === this.state.activeIndex ? styles.iconActive : styles.icon}
                        />
                    </TouchableOpacity>
                )}
            </View> : null
        );
    }
}

export { NavFooter };