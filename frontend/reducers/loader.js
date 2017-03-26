const initialState = {
    is_loading: false,
    message:    ''
}

export default function lang(state = initialState, action) {
    if (!action) {
        return initialState
    }

    switch(action.type){
        case 'START_LOADING':
            return {
                state,
                is_loading: true,
                message: action.message
            };
        case 'STOP_LOADING':
            return {
                state,
                is_loading: false,
                message: ''
            };
        default:{
            return {
                state
            }
        }
    }
}