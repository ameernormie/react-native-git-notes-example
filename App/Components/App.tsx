import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import AppContainer from '../Navigation/AppNavigation';
// import createStore from './../Redux';
// import { Provider } from 'react-redux';

// const store = createStore();

export interface Props {
  navigation: NavigationScreenProps;
}
export interface State {}

export default class App extends Component<{}, {}> {
  render() {
    return <AppContainer />;
  }
}
