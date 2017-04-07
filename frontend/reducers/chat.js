import CHAT from '../constants/Chat'

const initialState = {
    status : 'OFFLINE',
    friends : []
};


export default function lang(state = initialState, action) {

    switch (action.type) {
        case CHAT.SET_ACTUAL_FRIEND_LIST:
            return {state, friends:action.friend_list};
        case "TEST":
            return {state};

        default:
            return state;
    }
}

