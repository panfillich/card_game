var io = require('../io');

var connect  = require('../../redis/connect');

let client1  = connect();
let client2  = connect();

let client_id = '';


client1.on('pmessage', function(pattern, channel, message) {
    client2.get('tester', function (err,  data) {
        console.log(err);
        console.log(data);
    });
    var room = channel.split(":");
    console.log(room);
    console.log(pattern);
    console.log(channel);
    console.log(message);

    io.sockets.connected[client_id].emit('message', {111:'test'});
    // client2.hgetall(msg, function(err, res) {
    //     res.key = msg;
    //     io.sockets.emit(res);
    // });
});

client1.psubscribe('chat:*');

//https://toster.ru/q/79184
io.on('connection', function(client) {

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