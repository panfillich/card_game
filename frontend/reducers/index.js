import { combineReducers } from 'redux'
import loader from './loader'
import user from './user'
import lang from './lang'

export default combineReducers({
    loader,
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
