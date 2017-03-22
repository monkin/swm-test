/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

require('offline-plugin/runtime').install();

// Needed fo material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

// Import root app
import App from 'ui/app';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './store';

// Import global styles
import './global-styles';

const initialState = { users: {}, dialogs: {} },
    store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="(:dialog)" component={App}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);

