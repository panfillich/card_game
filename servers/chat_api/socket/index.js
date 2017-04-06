let io          = require('../io');

let Session     = require('../../models/sessions');
let Friends     = require('../../models/friends');

let connect     = require('../../redis/connect');

// 10.1 минуты
// Время, после которого проверяем токен
const MAIN_TIME  = 606000;

// Если токен найден, но чат неактивен (что странно, но бывает)
// Уменьшаем интервалы проверок до 30 секунд
const DETAIL_TIME = 500;




let users = [];

let checkTokenTimer;
io.on('connection', function(client) {
    function logout() {
        client.emit('logout', "token is invalid");
        console.log('logout');
        client.disconnect();
    }

    // Проверяем токен
    var token = client.request._query.token;

    // Параметра нет - отключаем
    if(!token){
        return logout();
    }

    // Токен есть, робим валидацию
    // Для начала длинну
    if(token.length!=128){
        return logout();
    }

    // Теперь находим пользователя с таким токеном
    Session.getSession(token, function (err, user) {
        if(err){
            return logout();
        }

        if(!user){
            return logout();
        }

        if(token!=user.token){
            return logout();
        }

        // Устанавливаем состояние пользователя в сессию
        Session.setParamsInSession(user.userId, user.token, {status:'ENTER'});

        // Нашли пользователя, теперь подтягиваем его друзей
        Friends.getAllFriends({userId: user.userId}, function (err, friends) {
            if(err){
                return;
            }

            if(friends){
                // Формируем адекватный список так как пользователю не нужно знать IDs друзей
                let friend_list_for_client = [];
                friends.forEach(function (friend) {
                    friend_list_for_client.push({
                        createdAt : friend.createdAt,
                        login :  friend.login,
                        recordId : friend.recordId
                    });
                });

                // Отправляем этот список
                client.emit('friend:list', friend_list_for_client);

                // Узнаем статуса друзей (асинхронно)
                friends.forEach(function (friend) {
                    Session.getSessionById(friend.userId, function (err, res) {
                       if(!err && res){
                           if(res.status){
                               client.emit('friend:status', {
                                   status: res.status,
                                   recordId: friend.recordId
                               });
                           }
                       }
                    });
                });

                // Навешиваем события от пользователя

                // Пользователь послал сообщение
                client.on('friend:message', function (data) {

                });

                // Пользователь изменит статус
                client.on('friends:status', function (data) {

                });

                // Пользователь удалил друга
                client.on('friend:del', function (data) {

                });

                // Пользователь пытается добавить нового друга
                client.on('friend:add', function (data) {

                });
            }
        });
    });

    // заголовок есть - проверяем длинну

    /*client2.publish('chat:222:222', 'message2');

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
    });*/
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
client1.psubscribe('chat:*', 'test:*', 'token:*');