import CHAT from '../constants/Chat'

const initialState = {
    is_connect : false,
    status : 'OFFLINE',
    friends : []
};


export default function chat(state = initialState, action) {
    switch (action.type) {

        /*case CHAT.CHAT_CONNECT :
            return {
                is_connect : true,
                status : 'ONLINE',
                friends : []
            };*/

        case CHAT.CHAT_SET_NEW_FRIENDS_STATE:
            return {
                 is_connect : state.is_connect,
                 status     : state.status,
                 friends    : action.friends
            };

        case CHAT.CHAT_CHANGE_USER_STATUS:
            return {
                status      : action.status,
                is_connect  : state.is_connect,
                friends     : action.friends
            };


        case CHAT.CHAT_LOG_OUT :
            return {
                is_connect  : false,
                status      : 'OFFLINE',
                friends     : []
            };
        default:
            return state;
    }
}

