let socket_io_client = require('socket.io-client');
import store from '../../../store'

// const SERVER = 'http://localhost:3004/priv-api';
const SERVER = 'http://localhost:3004';

class Chat{
    connect(){
        const token = store.getState().user.token;
        console.log(store.getState());

        var opts = {
            query: {token: token}
        };

        this.client = socket_io_client(SERVER, opts);

        this.client.on('connect', function (data) {
            console.log(data);
            // socket.emit('join', 'Hello World from client2');
        });
    }

    disconnect(){
        this.client.disconnect();
    }

    reconnect(){
        this.client.io.reconnect();
    }
}

export default new Chat;