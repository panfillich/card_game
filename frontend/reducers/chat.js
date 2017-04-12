import CHAT from '../constants/Chat'

const initialState = {
    action_type : '',
    is_connect : false,
    status : 'OFFLINE',
    friends : []
};


export default function chat(state = initialState, action) {
    switch (action.type) {
        case "CONNECT":
            return Object.assign({}, state, {
                action_type: action.type,
                is_connect : true,
                status : 'ONLINE',
                friends: action.friends
            });

        case "DISCONNECT":
            return Object.assign({}, state, {
                action_type: action.type,
                is_connect : false,
                status : 'OFFLINE',
                friends: action.friends
            });

        case "CHANGE_USER_STATUS":
            return Object.assign({}, state, {
                status : action.status
            });

        case "LOGOUT":
            return initialState;

        case "CHANGE_FRIEND_LIST":
            return Object.assign({}, state, {
                action_type: action.action_type,
                friends: action.friends
            });

        default:
            return state;
    }
}

