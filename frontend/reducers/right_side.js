const initialState = {
    chat: false
}

export default function lang(state = initialState, action) {
    switch(true){
        case (['CLOSE_CHAT','LOGOUT'].indexOf(action.type) != -1):
            return {
                state,
                chat: false
            }
        case action.type == 'SHOW_CHAT':
            return {
                state,
                chat: true
            };
        default:
            return state;
    }
}