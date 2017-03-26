import { combineReducers } from 'redux'
import loader   from './loader'
import user     from './user'
import lang     from './lang'
import right_side from './right_side'

export default combineReducers({
    right_side,
    loader,
    user,
    lang,

})

