import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppContainer from '../Navigation/AppNavigation';
import store from './../Redux';

export interface AppProps {}
export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  render() {
    console.log('store ', store.getState());
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
