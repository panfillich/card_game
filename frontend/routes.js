import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import Link from './components/Link'

import Auth     from './containers/Auth'
import Reg      from './containers/Reg'
import Main     from './containers/Main'
import Articles from './containers/Articles'
import Article  from './containers/Article'
import Nav      from './containers/Nav'
import Deck     from './containers/Deck'
import Decks     from './containers/Decks'
import Game     from './containers/Game'
import Collection from './containers/Collection'

import NotFound from './components/NotFound'

import store from './store'

function checkAuth() {
    let state = store.getState();
    if(!state.user.is_auth){
        browserHistory.push('/auth');
    }
}


export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRoute component={Main} />

            <Route path='/auth'     component={Auth} />
            <Route path='/reg'      component={Reg} />

            <Route path='/article/:article_id' component={Article} />
            <Route path='/articles(/:page)'    component={Articles} />

            <Route path='/link' component={Link} />
            <Route path='/nav'  component={Nav} />

            <Route path='/game'             component={Game}        /*onEnter={ checkAuth }*//>
            <Route path='/decks'            component={Decks}       onEnter={ checkAuth }/>
            <Route path='/deck/:deck_num/*' component={Deck}        onEnter={ checkAuth }/>
            <Route path='/collection'       component={Collection}  onEnter={ checkAuth }/>
            <Route path='*'     component={NotFound} />
        </Route>
    </div>
)
