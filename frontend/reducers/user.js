import localStorage from '../actions/LocalStorage'
import API          from '../actions/API/index'

let initialState = {
    is_auth : false,
    login   : '',
    token   : ''
}

export default function user(state = initialState, action) {
    switch(true){
        case action.type == 'LOGIN':
            return {
                is_auth : true,
                login   : action.params.login,
                token   : action.params.token
            }
        case action.type == 'LOGOUT':
            return {
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

