
import CHAT from '../constants/Chat'

function _setFriends(friends) {
    return {
        type: CHAT.CHAT_SET_NEW_FRIENDS_STATE,
        friends: friends
    }
}

function _addMessage(recordId, message, type) {
    return function (dispatch, getState) {
        let friends = getState().chat.friends;
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].recordId == recordId) {
                let date = new Date();
                friends[i].messages.push({
                    type: type,
                    date: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                    text: message
                });
                return  dispatch(_setFriends(friends));
            }
        }
    }
}



function setStateFriendsToOffline(){
    return function (dispatch, getState) {
        let friends = getState().chat.friends;
        friends.forEach(function (friend) {
            friend.status = 'OFFLINE';
        });
        dispatch(_setFriends(friends));
    }
}

function setActualFriendList(new_friends) {
    return function (dispatch, getState) {
        let old_friends = getState().chat.friends;

        new_friends.forEach(function (friend) {
            if (!friend.status) {
                friend.status = 'OFFLINE';
            }

            if (!friend.message) {
                friend.messages = [];
            }

            for (let i = 0; i < old_friends.length; i++) {
                if(old_friends[i].recordId = friend.recordId){
                    friend.messages = old_friends[i].messages;
                }
            }
        });
        dispatch(_setFriends(new_friends));
    }
}

function addFriendMessage(recordId, message) {
    return _addMessage(recordId, message, 'friend');
}

function addUserMessage(recordId, message) {
    return _addMessage(recordId, message, 'user')
}

function changeFriendStatus(recordId, status) {
    return function (dispatch, getState) {
        let friends = getState().chat.friends;
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].recordId == recordId) {
                friends[i].status = status;
                return dispatch(_setFriends(friends));
            }
        }
    }
}

function changeMyStatus(status) {
    return {
        type: CHAT.CHAT_CHANGE_USER_STATUS,
        status: status
    }
}

// Выходим из профиля пользователя
function logOut() {
    return {
        type: CHAT.CHAT_LOG_OUT

    }
}

// При потере связи с сервером
function disconnect() {
    return function (dispatch, getState) {
        let friends = getState().chat.friends;
        friends.forEach(function (friend) {
            friend.status = 'OFFLINE';
        });
        return {
            type: CHAT.CHAT_SET_NEW_FRIENDS_STATE,
            friends : friends
        }
    }
}


export default {
    addFriendMessage: addFriendMessage,
    addUserMessage: addUserMessage,
    changeFriendStatus: changeFriendStatus,
    changeMyStatus: changeMyStatus,
    setStateFriendsToOffline :setStateFriendsToOffline,
    setActualFriendList : setActualFriendList,
    logOut: logOut,
    disconnect: disconnect
}
