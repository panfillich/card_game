import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App2'
import Page from './components/Page'
import User from './components/User'
import Home from './components/Home'
import Link from './components/Link'
import NotFound from './components/NotFound'


export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='/page' component={Page} />
            <Route path='/user' component={User} />
            <Route path='/link' component={Link} />
        </Route>
        <Route path='*' component={NotFound} />
    </div>
)
