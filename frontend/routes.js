import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Page from './components/Page'
import User from './components/User'
import Link from './components/Link'

import Auth     from './containers/Auth'
import Reg      from './containers/Reg'
import Main     from './containers/Main'
import Articles from './containers/Articles'
import Nav      from './containers/Nav'

import NotFound from './components/NotFound'


export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Main} />

            <Route path='/auth'     component={Auth} />
            <Route path='/reg'      component={Reg} />

            <Route path='/articles(/:page)' component={Articles} />

            <Route path='/page'     component={Page} />
            <Route path='/user'     component={User} />
            <Route path='/link'     component={Link} />
            <Route path='/nav'      component={Nav} />
            <Route path='*'         component={NotFound} />
        </Route>
    </div>
)
