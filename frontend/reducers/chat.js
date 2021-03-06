const initialState = {
    action_type     : '',
    is_connect      : false,
    status          : 'OFFLINE',
    friends         : new Map(),
    sort            : 'relevant',
    filter_by_name  : '',
    selected_friend_recordId : false,

};

export default function chat(state = initialState, action) {
    switch (action.type) {
        // Пользовательские изменения без отправки на сервер
        case "CHAT_CHANGE_CURRENT_FRIEND":
            return Object.assign({}, state, {
                action_type : action.type,
                friends     : action.friends,
                selected_friend_recordId : action.selected_friend_recordId,
            });

        case "CHAT_CHANGE_SORT":
            return Object.assign({}, state, {
                action_type : action.type,
                sort        : action.sort
            });

        case "CHAT_CHANGE_FILTER_BY_NAME":
            return Object.assign({}, state, {
                action_type     : action.type,
                filter_by_name  : action.filter_by_name
            });

        // Могут быть вызван как пользователем вручную, так и сервером
        case "LOGOUT":
            return initialState;

        // Изменения с сервера
        case "CHAT_DISCONNECT":
            return Object.assign({}, state, {
                action_type : action.type,
                friends     : action.friends,
                is_connect  : false,
                status      : 'OFFLINE',
            });

        case "CHAT_CHANGE_USER_STATUS":
            return Object.assign({}, state, {
                action_type     : action.type,
                previous_event  : action.type,
                status          : action.status
            });

        case "CHAT_CHANGE_FRIEND_STATUS":
            return Object.assign({}, state, {
                action_type     : action.type,
                friends         : action.friends
            });

        case "CHAT_ADD_FRIEND":
            return Object.assign({}, state, {
                action_type     : action.type,
                friends         : action.friends
            });

        case "CHAT_DEL_FRIEND":
            return Object.assign({}, state, {
                action_type     : action.type,
                friends         : action.friends
            });

        // Если получаем/синхронизируем этот список с сервера,
        // значит произошло подключение / переподключение
        case "CHAT_NEW_FRIENDS_LIST":
            return Object.assign({}, state, {
                action_type     : action.type,
                friends         : action.friends,
                is_connect      : true,
                status          : 'ONLINE',
                selected_friend_recordId : action.selected_friend_recordId,
            });

        case "CHAT_ADD_NEW_MESSAGE":
            return Object.assign({}, state, {
                action_type     : action.type,
                friends         : action.friends
            });


        default:
            return state;
    }
}

