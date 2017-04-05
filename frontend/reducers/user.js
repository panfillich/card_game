import localStorage from '../actions/LocalStorage'
import API          from '../actions/API/index'

let initialState = {
    is_auth : false,
    login   : '',
    token   : ''
}

if(localStorage.is_local_storage) {
    if (localStorage.getItem("login") !== null) {
        API.chat.connect(localStorage.getItem("token"));
        initialState = {
            is_auth: true,
            login: localStorage.getItem("login"),
            token: localStorage.getItem("token")
        }
    }
}

export default function user(state = initialState, action) {
    switch(true){
        case action.type == 'LOGIN':
            return {
                state,
                is_auth : true,
                login   : action.params.login,
                token   : action.params.token
            }
        case action.type == 'LOGOUT':
            return {
                state,
                is_auth : false,
                login   : '',
                token   : ''
            };
        default:

            return state;
    }

    /*if(action.params){
        let obj_for_reload_state = {state};
        for(let param in action.params){
            obj_for_reload_state[param] = action.params[param];
        }
        return obj_for_reload_state;
    } else {
        return state;
    }*/
}

