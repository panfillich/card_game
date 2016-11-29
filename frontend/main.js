// https://trank.com.ua/course/ReactJS
// https://maxfarseer.gitbooks.io/react-course-ru/content/
// https://maxfarseer.gitbooks.io/redux-course-ru/content/asinhronnie_actions.html
// https://habrahabr.ru/post/269831/
// https://habrahabr.ru/post/311964/
// https://maxfarseer.gitbooks.io/react-router-course-ru/content/indexredirect.html

import React from 'react';

import ReactDOM from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import ContactList from './old/contact_list';

import App from './old/app';
import Article from './old/article';

import Timer from './old/timer';


require.ensure(['stats.js'], function(require) {
    let Stats = require('stats.js');
    let stats = new Stats();
    // alert('Сработало');//
});


let data = require('./old/contact_list/data');

// console.dir(data);

// import Wrapper from './Wrapper'

ReactDOM.render(
    <div>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <Route path='/article/:title' component={Article}/>
            </Route>

            {/*<Route path='/timer' component={Timer}/>*/}
            {/*<Route path='/contact-list' component={ContactList}/>*/}
        </Router>
        {/*<Timer />*/}
        <ContactList data={data}/>
    </div>,
    document.getElementById('app')
);

