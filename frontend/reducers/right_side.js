const initialState = {
    chat: false
}

export default function lang(state = initialState, action) {
    switch(true){
        case (['CLOSE_CHAT','LOGOUT'].indexOf(action.type) != -1):
            return {
                chat: false
            }
        case action.type == 'SHOW_CHAT':
            return {
                chat: true
            };
        default:
            return state;
    }
}