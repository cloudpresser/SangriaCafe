import {AppRegistry} from 'react-native';
import App from './App.js';
import React from 'react';
import ReactDom from 'react-dom';

AppRegistry.registerComponent("SangriaCafe", () => App);
ReactDom.render(<App />, document.getElementById("root"));

