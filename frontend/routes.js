import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Link from './components/Link'

import Auth     from './containers/Auth'
import Reg      from './containers/Reg'
import Main     from './containers/Main'
import Articles from './containers/Articles'
import Article  from './containers/Article'
import Nav      from './containers/Nav'

import NotFound from './components/NotFound'


export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Main} />

            <Route path='/auth'     component={Auth} />
            <Route path='/reg'      component={Reg} />

            <Route path='/article/:article_id' component={Article} />
            <Route path='/articles(/:page)' component={Articles} />

            <Route path='/link'     component={Link} />
            <Route path='/nav'      component={Nav} />
            <Route path='*'         component={NotFound} />
        </Route>
    </div>
)
