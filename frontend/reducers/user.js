const lang = require('../lang/en');

const initialState = {
    is_auth:    false,
    login:      'Guest'
}

export default function user(state = initialState) {
    return state
}