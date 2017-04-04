let io          = require('../io');
let Session     = require('../../models/sessions');
let connect     = require('../../redis/connect');

class User{
    constructor(id){
        this.is_auth = false;
        this.chat_id = 0;
        this.status = {};
        this.friends = {};
    }
}

let users = [];


let client1  = connect();
let client2  = connect();

let client_id = '';


client1.on('pmessage', function(pattern, channel, message) {
    client2.get('tester', function (err,  data) {
        console.log(err);
        console.log(data);
    });
    var room = channel.split(":");

    //io.sockets.connected[client_id].emit('message', {111:'test'});
    // client2.hgetall(msg, function(err, res) {
    //     res.key = msg;
    //     io.sockets.emit(res);
    // });
});

//https://toster.ru/q/79184
client1.psubscribe('chat:*', 'test:*');


io.on('connection', function(client) {
    // Проверяем токен
    var token = client.request._query.token;

    // Параметра нет - отключаем
    if(!token){
        client.disconnect();
        return;
    }

    // Токен есть, робим валидацию
    // Для начала длинну
    if(token.length!=128){
        client.disconnect();
        return;
    }

    // Теперь находим пользователя с таким токеном
    Session.getSession(token, function (err, res) {
        if(err){
            return client.disconnect();
        }

        if(!res){
             return client.disconnect();
        }

        if(token!=res.token){
            return client.disconnect();
        }

        // Нашли пользователя, теперь подтягиваем его друзей
        console.log(res);


        // return next();
    });

    // заголовок есть - проверяем длинну

    client2.publish('chat:222:222', 'message2');

    console.dir(client.id);
    console.log('Client connected...');
    client_id = client.id;


    client.on('join', function(data) {
        console.log(data);
        // io.sockets.connected[client.id].emit('message', {111:'test'});
        // client.disconnect();
    });

    client.on('message', function (data) {

    });

    client.on('add_friend', function (data) {

    });

    client.on('del_friend', function (data) {

    });

    client.on('status', function (data) {

    });

    client.on('disconnect', function () {
        console.log('user disconnected');
    });
});

/*io.sockets.on('connection', function (socket) {
    console.dir(socket);
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('join', function(data) {
        console.log(data);
        client.emit('messages', 'Hello from server');
    });

});*/