import CHAT from '../constants/Chat'
import _ from 'lodash'

// Действия в рамках клинта, никаких запросов на сервер или обработка ответов
class Client{
    // Установить друга для разговора
    static setFriend(recordId){
        return function (dispatch, getState) {
            let friends = getState().chat.friends;

            let  new_friends = _.cloneDeep(friends);

            new_friends.forEach(function (new_friend) {
                new_friend.is_selected = false;
                if(new_friend.recordId == recordId){
                    new_friend.is_selected = true;
                    new_friend.unread_messages = 0;
                }
            });

            return dispatch({
                type: "CHANGE_FRIEND_LIST",
                friends: new_friends
            });
        }
    }
}

// Запросы на сервер
class ToServer{
    // Послать запрос на сервер на добавление друга
    static addFriend(login){

    }

    // Послать запрос на сервер на удаление друга
    static addFriend(recordId){

    }

    // Изменить статус пользователя
    static changeUserStatus(status){

    }

    // Послать другу сообщение
    static sendMessageToFriends(recordId, message, time){

    }
}


// Ответы сервера
class FromServer{

    /*--ОТВЕТЫ НА ДЕЙСТВИЯ ПОЛЬЗОВАТЕЛЯ--*/

    // Подтверждение добавления друга
    static confirmAddFriend(recordId) {

    }

    // Подтверждение удаление друга
    static confirmDelFriend(recordId) {

    }

    // Сообщения от всех (себя/друзей/прочего)
    static addMessage(type, recordId, text, time){
        return function (dispatch, getState) {
            switch (true){
                // Сообщение пользователя и его друзей
                case (['self', 'friend'].indexOf(type)!= -1) :
                    let friends = getState().chat.friends;
                    let new_friends = _.cloneDeep(friends);

                    for (let i = 0; i < friends.length; i++) {
                        if (new_friends[i].recordId == recordId) {
                            let date = new Date(time);
                            let new_message = {
                                type: type,
                                date: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                                text: text
                            };

                            if(!(type == 'self' || ( type == 'friend' && new_friends[i].is_selected == true))){
                                if(new_friends[i].unread_messages < 50){
                                    new_friends[i].unread_messages++;
                                }
                            }

                            new_friends[i].messages.push(new_message);

                            //Если у пользователя больше 50 сообщений, то удаляем 51
                            if( new_friends[i].messages.length > 50){
                                new_friends[i].messages.splice(0,1);
                            }

                            return dispatch({
                                type: "CHANGE_FRIEND_LIST",
                                friends: new_friends
                            });
                        }
                    }
                // Техническое сообщение
                case (type == 'tech'):
                    return false;
                default:
                    return false;
            }
        }
    }


    /*--ДЕЙСТВИЯ ДРУЗЕЙ--*/

    // Пользователя самого удалили из друзей
    static delUserFromFriends(recordId) {

    }

    // Изменен статус друга
    static changeUserStatus(recordId, status){

    }

    // Пользователю послали сообщение
    static sendMessageToUser(recordId, message){
        return function (dispatch, getState) {
            let friends = getState().chat.friends;
            for (let i = 0; i < friends.length; i++) {
                if (friends[i].recordId == recordId) {
                    let date = new Date();
                    friends[i].messages.push({
                        type: 'FRIEND',
                        date: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
                        text: message
                    });
                    return dispatch({
                        type: "CHANGE_FRIEND_LIST",
                        friends: new_friends
                    });
                }
            }
        }
    }


    /*--ДЕЙСТВИЯ ИНЫХ ПОЛЬЗОВАТЕЛЕЙ--*/

    // Запрос на добавление пользователя в друзья
    static addUserToFriends(recordId, login){

    }


    /*--ИНЫЕ ДЕЙСТВИЯ/СОБЫТИЯ СЕРВЕРА--*/

    // Отключится от сервера, команда с сервера (по сути это тот же disconnect но с другим сообщением)
    static logOut(){
        return {
            type: "LOGOUT"
        }
    }

    // Потеря соединения
    static disconnect() {
        return function (dispatch, getState) {
            let friends = getState().chat.friends;
            friends.forEach(function (friend) {
                friend.status = 'OFFLINE';
            });
            return {
                type: "DISCONNECT",
                friends : friends
            }
        }
    }

    // Новое соединение
    // При новом соединение мы получаем актуальный список друзей без их статусов (приходят потом)
    static connect(new_friends) {
        return function (dispatch, getState) {
            let old_friends = getState().chat.friends;

            // Найден ли выбранный пользователь в новом актульном списке друзей
            let is_selected_user_found = false;

            new_friends.forEach(function (new_friend) {
                new_friend.is_selected = false;
                new_friend.status = 'OFFLINE';
                new_friend.messages = [];
                new_friend.unread_messages = 0;

                // Старые сообщения при реконнекте сохраняем в новое состояние
                for (let i = 0; i < old_friends.length; i++) {
                    if(old_friends[i].recordId == new_friend.recordId){
                        new_friend.messages         = old_friends[i].messages;
                        new_friend.unread_messages  = old_friends[i].unread_messages;
                        if(old_friends[i].is_selected){
                            new_friend.is_selected = true;
                            is_selected_user_found = true;
                        }
                    }
                }
            });

            if(!is_selected_user_found && new_friends.length > 0){
                new_friends[0].is_selected = true;
            }

            return dispatch({
                type: "CONNECT",
                friends : new_friends
            });
        }
    }
}





/*
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
*/

export default {
    Client : Client,
    ToServer : ToServer,
    FromServer : FromServer

    /*addFriendMessage: addFriendMessage,
    addUserMessage: addUserMessage,
    changeFriendStatus: changeFriendStatus,
    changeMyStatus: changeMyStatus,
    setStateFriendsToOffline :setStateFriendsToOffline,
    setActualFriendList : setActualFriendList,
    logOut: logOut,
    disconnect: disconnect*/
}
