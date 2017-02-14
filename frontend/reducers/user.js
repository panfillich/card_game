const lang = require('../lang/en');

const initialState = {
    is_auth:    false,
    login:      lang.user.def_login,
    language:   'en'
}

export default function user(state = initialState) {
    return state
}