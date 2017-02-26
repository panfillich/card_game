import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
// import App from './containers/App2'
import Page from './components/Page'
import User from './components/User'
import Home from './components/Home'
import Link from './components/Link'

import Auth2 from './containers/Auth2'
import Reg from './containers/Reg'
import Main from './containers/Main'

import Nav from './containers/Nav'
import NotFound from './components/NotFound'


export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Main} />

            {/*Авторизация*/}
            <Route path='/auth' component={Auth2} />
            <Route path='/reg'  component={Reg} />

            <Route path='/page' component={Page} />
            <Route path='/user' component={User} />
            <Route path='/link' component={Link} />
            <Route path='/nav'  component={Nav} />
            <Route path='*' component={NotFound} />
        </Route>
    </div>
)
