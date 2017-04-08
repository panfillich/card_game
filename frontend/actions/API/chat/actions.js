import Chat from './index'
import ChatAction from './../../ChatActions'
import ACTION from './action_consts'

export  default function (store) {
    Chat.setAction(ACTION.CONNECT, function () {
        store.dispatch(ChatAction.logIn());
    });

    Chat.setAction(ACTION.DISCONNECT, function () {
        store.dispatch(ChatAction.logOut());
    });
}
