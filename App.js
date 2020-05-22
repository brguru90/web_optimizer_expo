import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Routes from './Routes.js'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from "./Components/Reducers/index"
const store = createStore(allReducers);


class reactTutorialApp extends Component {
   render() {
      return (
         <Provider store={store}>
            <Routes />
          </Provider>

      )
   }
}
export default reactTutorialApp
AppRegistry.registerComponent('reactTutorialApp', () => reactTutorialApp)