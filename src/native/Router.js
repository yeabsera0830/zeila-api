import React, { Component } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import {
    AddPlace, BasicInfo, BusinessProfile, CategorySearch, Login, NearbyWrapper,
    Profile, SearchWrapper, Settings, Signup, Welcome
} from './components';
import sceneKeys from './values/sceneKeys';
import authState from '../core/states/auth';
import headerFooterState from '../core/states/headerFooter';
import strings from '../common/values/strings';
import colors from './values/colors';

export default class RouterComponent extends Component {
    constructor(props) {
        super(props);
        this.backButtonDoublePressIntervalInMillis = 700;
        this.toExitPressBackBefore = this.getCurrentTimeInMillis() + this.backButtonDoublePressIntervalInMillis;
        this.isAuthenticated = authState.isAuthenticated;
    }

    registerBackButtonPressListener = () => {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.onBackPress();
            return true;
        });
    }

    unregisterBackButtonPressListener = () => {
        this.backHandler.remove();
    }

    onBackPress = () => {
        if (this.getCurrentTimeInMillis() < this.toExitPressBackBefore) {
            BackHandler.exitApp();
        } else {
            this.toExitPressBackBefore = this.getCurrentTimeInMillis() + this.backButtonDoublePressIntervalInMillis;
            ToastAndroid.show(strings.pressBackAgain, ToastAndroid.SHORT);
        }
    }

    getCurrentTimeInMillis = () => {
        return new Date().getTime();
    }

    render() {
        return (
            <Router sceneStyle={styles}>
                <Scene key={sceneKeys.ROOT} hideNavBar headerMode='none'>
                    <Scene key={sceneKeys.AUTH.ROOT} initial={!this.isAuthenticated}>
                        <Scene
                            key={sceneKeys.AUTH.WELCOME}
                            component={Welcome}
                            initial
                            on={() => {
                                headerFooterState.footer.shouldDisplay.value = false;
                                this.registerBackButtonPressListener();
                            }}
                            onExit={this.unregisterBackButtonPressListener}
                        />
                        <Scene key={sceneKeys.AUTH.SIGNUP} component={Signup} />
                        <Scene key={sceneKeys.AUTH.LOGIN} component={Login} />
                    </Scene>
                    <Scene
                        key={sceneKeys.BASIC_INFO}
                        component={BasicInfo}
                        on={() => {
                            headerFooterState.footer.shouldDisplay.value = false;
                            headerFooterState.header.shouldDisplay.value = false;
                            this.registerBackButtonPressListener();
                        }}
                        onExit={() => {
                            if (!authState.basicInfo.isFirstTime) {
                                headerFooterState.footer.shouldDisplay.value = true;
                                headerFooterState.header.shouldDisplay.value = true;
                            }
                            this.unregisterBackButtonPressListener();
                        }}
                    />
                    <Scene key={sceneKeys.MAIN.ROOT} initial={this.isAuthenticated}>
                        <Scene
                            key={sceneKeys.MAIN.NEARBY}
                            initial
                            component={NearbyWrapper}
                            on={() => {
                                headerFooterState.footer.shouldDisplay.value = true;
                                headerFooterState.footer.activeIndex.value = 0;
                                headerFooterState.header.searchBarDefaultText.value = '';
                                this.registerBackButtonPressListener();
                            }}
                            onExit={this.unregisterBackButtonPressListener}
                        />
                        <Scene
                            key={sceneKeys.MAIN.SEARCH}
                            component={SearchWrapper}
                            on={() => {
                                headerFooterState.footer.activeIndex.value = 1;
                                headerFooterState.header.searchBarDefaultText.value = '';
                            }}
                        />
                        <Scene
                            key={sceneKeys.MAIN.ADD_PLACE}
                            component={AddPlace}
                            on={() => {
                                headerFooterState.footer.activeIndex.value = 2;
                                headerFooterState.header.searchBarDefaultText.value = '';
                            }}
                        />
                        <Scene
                            key={sceneKeys.MAIN.PROFILE}
                            component={Profile}
                            on={() => {
                                headerFooterState.footer.activeIndex.value = 3;
                                headerFooterState.header.searchBarDefaultText.value = '';
                            }}
                        />
                        <Scene
                            key={sceneKeys.MAIN.SETTINGS}
                            component={Settings}
                            on={() => {
                                headerFooterState.footer.activeIndex.value = 4;
                                headerFooterState.header.searchBarDefaultText.value = '';
                            }}
                        />
                        <Scene
                            key={sceneKeys.MAIN.BUSINESS_PROFILE}
                            component={BusinessProfile}
                            on={() => {
                                headerFooterState.footer.shouldDisplay.value = false;
                            }}
                            onExit={() => {
                                headerFooterState.header.searchBarDefaultText.value = '';
                                headerFooterState.footer.shouldDisplay.value = true;
                            }}
                        />
                        <Scene
                            key={sceneKeys.MAIN.CATEGORY_SEARCH}
                            component={CategorySearch}
                            on={() => { headerFooterState.footer.activeIndex.value = 1; }}
                        />
                    </Scene>
                </Scene>
            </Router >
        );
    }
}

const styles = {
    backgroundColor: colors.theme.LIGHT
};