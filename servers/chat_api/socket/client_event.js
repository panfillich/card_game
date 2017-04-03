let io      = require('../io');
let client  = require('../redis/client');

//https://toster.ru/q/79184
io.on('connection', function(client) {
    var headers = client.request.headers;
    console.log('---');
    console.dir(headers);
    console.log('---');

    client2.publish('chat:222:222', 'message2');

    console.dir(client.id);
    console.log('Client connected...');
    client_id = client.id;
    client.on('token', function(data) {
        console.log(data);
        // io.sockets.connected[client.id].emit('message', {111:'test'});
        // client.disconnect();
    });

    //Приватное сообщение для пользователя
    client.on('message:priv', function (data) {

    });

    client.on('friend:add', function (data) {

    });

    client.on('friend:del', function (data) {

    });

    client.on('status', function (data) {

    });

    client.on('disconnect', function () {
        console.log('user disconnected');
    });
});
