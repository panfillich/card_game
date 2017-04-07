import CHAT from '../constants/Chat'

function setActualFriendList(friend_list) {
    friend_list.forEach(function (friend) {
        if(!friend.status) {
            friend.status = 'OFFLINE';
        }
    });
    return {
        type: CHAT.SET_ACTUAL_FRIEND_LIST,
        friend_list: friend_list
    }
}

function addFriendMessage(recordId, message) {
    return {
        type: 'TEST',
        recordId: recordId,
        message: message
    }
}

function addMyMessage(recordId, message) {
    return {
        type: CHAT.ADD_MY_MESSAGE,
        recordId: recordId,
        message: message
    }
}

function changeFriendStatus(recordId, status) {
    return {
        type: CHAT.CHANGE_FRIEND_STATUS,
        recordId: recordId,
        status: status
    }
}

function changeMyStatus(status) {
    return {
        type: CHAT.CHANGE_MY_STATUS,
        status: status
    }
}

function logOut() {
    return {
        type: CHAT.LOG_OUT_FROM_CHAT
    }
}

export default {
    addFriendMessage    : addFriendMessage,
    addMyMessage        : addMyMessage,
    changeFriendStatus  : changeFriendStatus,
    changeMyStatus      : changeMyStatus,
    logOut              : logOut
}
