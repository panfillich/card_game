import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import lang from './lang'

export default combineReducers({
    page,
    user,
    lang
})

/*const initialState = {
    name: 'Василий',
    surname: 'Реактов',
    age: 27
}

export default function userstate(state = initialState) {
    return state
}
*/
