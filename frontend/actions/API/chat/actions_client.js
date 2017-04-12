import Chat from './index'

export  default function (store) {
    Chat.setAction(ACTION.CONNECT, function () {
        //store.dispatch(ChatAction.logIn());
    });

    Chat.setAction(ACTION.FRIEND_LIST, function (data) {
        store.dispatch(ChatAction.setActualFriendList(data));
    });

    Chat.setAction(ACTION.DISCONNECT, function (data) {
        if(data == 'forced close') {
            store.dispatch(ChatAction.logOut());
        } else {
            store.dispatch(ChatAction.disconnect());
        }
    });

    Chat.setAction(ACTION.MESSAGE, function (data) {
        store.dispatch(ChatAction.addFriendMessage(
            data.type, data.recordId, data.time, data.text
        ));
    })
}
