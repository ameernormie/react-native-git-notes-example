import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import AppContainer from '../Navigation/AppNavigation';
import store from './../Redux';
// import createStore from './../Redux';
import { Provider } from 'react-redux';

// const store = createStore();

export interface Props {
  navigation: NavigationScreenProps;
}
export interface State {}

export default class App extends Component<{}, {}> {
  render() {
    console.log('store ', store.getState());
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
