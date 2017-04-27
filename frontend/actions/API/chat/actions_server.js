import Chat from './index'
import ChatAction from './../../ChatActions'
import ACTION from './action_consts'


export  default function (store) {
    function setMessage(type, data) {
        const RECORD_ID = data.recordId;
        const MESSAGE = {
            type: type,
            time: data.time,
            text: data.text
        };
        store.dispatch(ChatAction.FromServer.addMessage(RECORD_ID, MESSAGE));
    }

    // Просто коннект который ни очем не говорит
    Chat.setAction(ACTION.CONNECT, function () {
        //store.dispatch(ChatAction.logIn());
    });

    // Если мы получили список друзей, значит авторизация прошла успешна
    Chat.setAction(ACTION.FRIEND_LIST, function (friends) {
        store.dispatch(ChatAction.FromServer.setOfflineFriends(friends));
    });

    // Потеряли связь с сервером
    Chat.setAction(ACTION.DISCONNECT, function (data) {
        if(data != 'forced close') {
            store.dispatch(ChatAction.FromServer.disconnect());
        } else {

        }
    });

    // Сообщение от самого пользователя
    Chat.setAction(ACTION.MESSAGE_USER, function (data) {
        setMessage('user', data);
    });

    // Сообщение от друга
    Chat.setAction(ACTION.MESSAGE_FRIEND, function (data) {
        setMessage('friend', data);
    });

    // Друг изменил статус
    Chat.setAction(ACTION.STATUS_FRIEND, function (data) {
        const RECORD_ID = data.recordId;
        const STATUS    = data.status;
        store.dispatch(ChatAction.FromServer.changeFriendStatus(RECORD_ID, STATUS));
    });

    // Пользователь изменил статус
    Chat.setAction(ACTION.STATUS_USER, function (data) {
        const STATUS    = data.status;
        store.dispatch(ChatAction.FromServer.changeUserStatus(STATUS));
    });
}
