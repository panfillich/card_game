import CHAT from '../constants/Chat'
import _ from 'lodash'

const MAX_MESSAGES_PER_USER = 50;

// Структура state.chat:
// const initialState = {
//     action_type : '',
//     is_connect : false,
//     selected_friend_recordId : false,
//     status : 'OFFLINE',
//     friends : new Map(),
//     unconfirmed_friends: new Map(),
//     selected_friend: 0
// };


// Действия в рамках клинта, никаких запросов на сервер или обработка ответов
class Client{
    static setFriend(recordId){
        return function (dispatch, getState) {
            let chat = getState().chat;

            let old_friends                  = chat.friends;
            let old_selected_friend_recordId = chat.selected_friend_recordId;

            // Если мы выбрали пользователя, который уже был выбран
            if(recordId == old_selected_friend_recordId){
                return false;
            }

            let new_friends = _.cloneDeep(old_friends);

            let new_selected_friend = new_friends.get(recordId);
            new_selected_friend.is_selected = true;
            if(new_selected_friend.unread_messages>0) {
                new_selected_friend.unread_messages = 0;
            }

            // Убираем отметку у старого отмеченного/выбранного пользовате на текущем состоянии
            if(old_selected_friend_recordId) {
                new_friends.get(old_selected_friend_recordId).is_selected = false;
            }

            return dispatch({
                type: "CHAT_CHANGE_CURRENT_FRIEND",
                friends:  new_friends,
                selected_friend_recordId: recordId
            });
        }
    }

    static setSort(sort){
        return {
            type: "CHAT_CHANGE_SORT",
            sort: sort
        }
    }

    static setFilterByName(name){
        return {
            type: "CHAT_CHANGE_FILTER_BY_NAME",
            filter_by_name: name
        }
    }
}

// Ответы сервера
class FromServer{

    // Изменение статуса пользователя
    static changeUserStatus(status){
        return {
            type: "CHAT_CHANGE_USER_STATUS",
            status: status
        }
    }


    // Изменение статуса друга
    static changeFriendStatus(recordId, status){
        return function (dispatch, getState) {
            let friends = getState().chat.friends;
            let new_friends = _.cloneDeep(friends);

            let friend = new_friends.get(recordId);
            friend.status = status;

            return {
                type: "CHAT_CHANGE_FRIEND_STATUS",
                friends: new_friends
            }
        }
    }


    // Потеря соединения
    static disconnect() {
        return function (dispatch, getState) {
            let friends = getState().chat.friends;
            let new_friends = _.cloneDeep(friends);

            for(let friend of new_friends.values()) {
                friend.status = 'OFFLINE';
            }

            return {
                type: "CHAT_DISCONNECT",
                friends : friends
            }
        }
    }


    // Отключится от сервера, команда с сервера (по сути это тот же disconnect но с другим сообщением)
    static logOut(){
        return {
            type: "LOGOUT"
        }
    }


    // Cписок друзей (оффлайн), первый ответ с сервера
    static setOfflineFriends(friends){
        return function (dispatch, getState) {
            let old_friends = getState().chat.friends;
            let old_selected_friend_recordId = getState().chat.selected_friend_recordId;

            let new_friends = new Map();
            let new_selected_friend_recordId = false;

            friends.forEach(function (friend) {
                friend.is_selected = false;
                friend.status = 'OFFLINE';
                friend.messages = [];
                friend.unread_messages = 0;

                if (!new_selected_friend_recordId) {
                    if (friend.recordId == old_selected_friend_recordId) {
                        new_selected_friend_recordId = old_selected_friend_recordId;
                        console.log(old_selected_friend_recordId);
                    }
                }

                if (old_friends.has(friend.recordId)) {
                    let old_friend = old_friends.get(friend.recordId);
                    friend.messages = old_friend.messages;
                    friend.unread_messages = old_friend.unread_messages;
                    if (old_friend.is_selected) {
                        friend.is_selected = true;
                    }
                }

                new_friends.set(friend.recordId, friend);
            });

            if(friends.length > 0 && !new_selected_friend_recordId){
                new_selected_friend_recordId = friends[0].recordId;
            }

            return dispatch({
                type: "CHAT_NEW_FRIENDS_LIST",
                friends: new_friends,
                selected_friend_recordId: new_selected_friend_recordId
            });
        }
    }


    // Пользовательское coобщение или сообщение от друга
    static addMessage(recordId, message){
        return function (dispatch, getState) {
            let friends = getState().chat.friends;
            let new_friends = _.cloneDeep(friends);

            let friend = new_friends.get(recordId);

            if(friend.messages.length > MAX_MESSAGES_PER_USER){
                friend.messages.splice(0,1);
            }

            if(message.type == 'friend' && !friend.is_selected){
                if(friend.unread_messages < MAX_MESSAGES_PER_USER){
                    friend.unread_messages++;
                }
            }

            friend.messages.push(message);

            //Отсортируем по времени
            friend.messages.sort(function(message_one, message_two) {
                switch (true){
                    case message_one.time > message_two.time:
                        return -1;
                    case message_one.time < message_two.time:
                        return 1;
                    default:
                        return 0;
                }
            });

            return dispatch({
                type: "CHAT_ADD_NEW_MESSAGE",
                friends: new_friends
            });
        }
    }


    // Пользователь изменил статус
    static changeUserStatus(status){
        return {
            type: "CHAT_CHANGE_USER_STATUS",
            status: status
        }
    }


    // Друг изменил статус
    static changeFriendStatus(recordId, status){
        return function (dispatch, getState) {
            let friends = getState().chat.friends;
            let new_friends = _.cloneDeep(friends);

            let friend = new_friends.get(recordId);
            friend.status = status;
            return dispatch({
                type: "CHAT_CHANGE_FRIEND_STATUS",
                friends: new_friends
            });
        }
    }


    // Добавляем нового друга
    static addFriend(friend){
        return function (dispatch, getState) {
            let friends = getState().chat.friends;
            let new_friends = _.cloneDeep(friends);

            friend.is_selected = false;
            friend.messages = [];
            friend.unread_messages = 0;

            new_friends.set(friend.recordId, friend);

            return dispatch({
                type: "CHAT_ADD_FRIEND",
                friends: new_friends
            });
        }
    }


    // Удаляем из друзей пользователя
    static delFriend(recordId){
        return function (dispatch, getState) {
            let friends = getState().chat.friends;
            let new_friends = _.cloneDeep(friends);

            new_friends.delete(recordId);

            return dispatch({
                type: "CHAT_DEL_FRIEND",
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
