// https://trank.com.ua/course/ReactJS
// https://maxfarseer.gitbooks.io/react-course-ru/content/
//https://habrahabr.ru/post/269831/
import React from 'react';

import ReactDOM from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import ContactList from './contact_list';

import App from './app';
import Article from './article';

import Timer from './timer';


require.ensure(['stats.js'], function(require) {
    let Stats = require('stats.js');
    let stats = new Stats();
    // alert('Сработало');//
});


let data = require('./contact_list/data');

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

