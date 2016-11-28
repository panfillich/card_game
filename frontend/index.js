import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'

// import $ from 'jquery'
// import bootstrap from 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'

import configureStore from './store/configureStore'

const store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore( () => {}, {}) //WAT ;)
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);