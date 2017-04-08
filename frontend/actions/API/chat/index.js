let socket_io_client = require('socket.io-client');
import ACTION_CONSTS    from './action_consts'


// const SERVER = 'http://localhost:3004/priv-api';
const SERVER    = 'http://localhost:3004';
const DEBUG     = true;

class Chat{
    constructor(){
        this.ACTION_CONSTS = ACTION_CONSTS;
        this.events = {};
        for(const ACTION_CONST in ACTION_CONSTS){
            this.events[ACTION_CONSTS[ACTION_CONST]] = [];
        }
    }

    connect(token){
        var opts = {
            query: {token: token}
        };

        this.client = socket_io_client(SERVER, opts);

        // Вот тута определяем события
        for(const ACTION_CONST in ACTION_CONSTS){
            let EVENT_NAME = ACTION_CONSTS[ACTION_CONST];
            this.client.on(EVENT_NAME, (data)=>{
                if(DEBUG) {
                    console.log(EVENT_NAME);
                    if(data) {
                        console.log(data);
                    }
                }
                this.callAction(EVENT_NAME, data);
            });
        }
    }

    // Подписка на событие
    setAction(event, callbackAction){
        this.events[event].push(callbackAction);
    }

    disconnect(){
        this.client.io.disconnect();
    }

    reconnect(){
        this.client.io.reconnect();
    }

    callAction(event, data){
        this.events[event].forEach(function (callbackAction) {
            callbackAction(data);
        });
    }

}

export default new Chat;