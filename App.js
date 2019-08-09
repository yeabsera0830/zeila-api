import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import { Constants } from 'expo';
import { MapView } from './src/native/components/common/MapView';
import { NavFooter } from './src/native/components/recurring';
import Router from './src/native/Router';
import { isLoggedIn } from './src/core/useCases/auth';
import authState from './src/core/states/auth';
import colors from './src/native/values/colors';

export default class App extends Component {
  state = { isAuthStatusKnown: false };

  async componentDidMount() {
    const isAuthenticated = await isLoggedIn();
    authState.isAuthenticated = isAuthenticated;
    this.setState({ isAuthStatusKnown: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}><Text style={styles.statusBarText} /></View>
        {this.state.isAuthStatusKnown ?
          <Fragment>
            <Router />
            <NavFooter />
            <MapView />
          </Fragment> : null}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  statusBar: {
    height: Constants.statusBarHeight
  },
  statusBarText: {
    backgroundColor: colors.theme.MAIN,
    flex: 1
  }
};