import CHAT from '../constants/Chat'

const initialState = {
    is_connect : false,
    status : 'OFFLINE',
    friends : []
};


export default function chat(state = initialState, action) {
    switch (action.type) {
        case CHAT.LOG_IN_CHAT :
            state.status = 'ONLINE';
            state.is_connect = true;
            break;

        case CHAT.SET_NEW_FRIENDS_STATE:
            state.friends = action.friends;
            break;

        case CHAT.CHANGE_MY_STATUS:
            state.status = action.status;
            break;

        case CHAT.LOG_OUT_FROM_CHAT :
            state.status = 'OFFLINE';
            state.is_connect = false;
            break;
        default:
            break;
    }
    return state;
}

