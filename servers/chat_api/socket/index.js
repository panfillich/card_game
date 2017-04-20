let _           = require('lodash');

let io          = require('../io');

let Session     = require('../../models/sessions');
let Friends     = require('../../models/friends');

let redis_client= require('../../redis/client');
let Users       = require('./users');


//Все события redis обрабатываются тут
require('./redis_event');

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

        const USER_ID = user.userId;
        const TOKEN = user.token;

        // Устанавливаем состояние пользователя в сессию
        Session.setParamsInSession(USER_ID, TOKEN, {status: 'ONLINE'});

        // Нашли пользователя, теперь подтягиваем его друзей
        Friends.getAllFriends({userId: USER_ID}, function (err, friends) {
            if(err){
                friends = [];
            }

            if(friends){
                // Формируем адекватный список так как пользователю не нужно знать IDs друзей
                let friend_list_for_client = [];
                friends.forEach(function (friend) {
                    friend_list_for_client.push({
                        createdAt : friend.createdAt,
                        login     : friend.login,
                        recordId  : friend.recordId
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
                                   status  : res.status,
                                   recordId: friend.recordId
                               });
                           }
                       }
                    });
                });
            }

            // создаем нового пользователя
            let User = Users.createNewUser({
                user: user,
                friends: friends,
                clientId: client.id
            });

            // Пользователь послал сообщение
            client.on('message', function (data) {
                if(!data.text || !data.recordId){
                    return logout();
                }

                data.text = String(data.text);
                if(data.text.length > 128){
                    return logout();
                }

                const FRIEND_ID = User.getFriendUserIdByRecordId(data.recordId);
                if(!FRIEND_ID){
                    return logout();
                }

                Session.checkUserSession(USER_ID, function (err, user_in_session) {
                    if (err || !user_in_session) {
                        return logout();
                    }
                    redis_client.publish("message:private:" + FRIEND_ID + ":" + USER_ID, JSON.stringify({
                        time: _.now(),
                        text: data.text
                    }));
                });
            });


            // Пользователь изменил статус
            client.on('status', function (data) {
                if(!data.status){
                    return logout();
                }

                if(['ONLINE', 'OFFLINE'].indexOf(data.status) == -1){
                    return logout();
                }

                Session.checkUserSession(USER_ID, function (err, user_in_session) {
                    if(err || !user_in_session){
                        return logout();
                    }

                    Session.setParamsInSession(USER_ID, TOKEN, {status: 'ONLINE'});
                    redis_client.publish("status:" + USER_ID, data.status);
                });
            });

            // Пользователь удалил друга
            client.on('friend:del', function (data) {

            });

            // Пользователь пытается добавить нового друга
            client.on('friend:add', function (data) {

            });

            // Отключили пользователя
            client.on('disconnect', function (data) {
                User.friends.forEach(function () {
                    redis_client.publish("status:" + USER_ID, 'OFFLINE');
                });
                Users.delUser(USER_ID);
                console.log(data);
                console.log('user disconnected');
            });
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
