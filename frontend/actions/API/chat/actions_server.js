import Chat from './index'
import ChatAction from './../../ChatActions'
import ACTION from './action_consts'

export  default function (store) {
    // Просто коннект который ни очем не говорит
    Chat.setAction(ACTION.CONNECT, function () {
        //store.dispatch(ChatAction.logIn());
    });

    // Если мы получили список друзей, значит авторизация прошла успешна
    Chat.setAction(ACTION.FRIEND_LIST, function (data) {
        store.dispatch(ChatAction.FromServer.connect(data));
    });

    Chat.setAction(ACTION.DISCONNECT, function (data) {
        if(data != 'forced close') {
            store.dispatch(ChatAction.FromServer.disconnect());
        }
    });

    Chat.setAction(ACTION.MESSAGE, function (data) {
        store.dispatch(ChatAction.FromServer.addMessage(
            data.type,
            data.recordId,
            data.text,
            data.time
        ));
    })
}
