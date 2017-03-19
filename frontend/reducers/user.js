const initialState = {
    is_auth : false,
    login   : '',
    token   : ''
}



export default function user(state = initialState, action) {
    console.log(action);
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