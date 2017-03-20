import localStorage from '../actions/LocalStorage'

let initialState = {
    is_auth : false,
    login   : '',
    token   : ''
}

if(localStorage.getItem("login") !== null){
    initialState = {
        is_auth : true,
        login   : localStorage.getItem("login"),
        token   : localStorage.getItem("token")
    }
}

export default function user(state = initialState, action) {
    if(action.params){
        let obj_for_reload_state = {state};
        for(let param in action.params){
            obj_for_reload_state[param] = action.params[param];
        }
        return obj_for_reload_state;
    } else {
        return state;
    }
}

