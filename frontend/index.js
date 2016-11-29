import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { routes } from './routes'

import configureStore from './store/configureStore'

import 'tether/dist/js/tether.js'
import 'jquery'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/scss/bootstrap.scss'

const store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);