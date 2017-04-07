let Users = require('./users');

// Основной клиент
let main_client = require('../../redis/client');

// Создаем еще одного клиента для прослушки
let createNewClient = require('../../redis/connect');
let sub_client  = createNewClient();


sub_client.on('pmessage', function(pattern, channel, message) {
    /*main_client.get('tester', function (err,  data) {
        console.log(err);
        console.log(data);
    });*/

    var room = channel.split(":");

    switch(room[0]){
        case 'message':
            const SENDER_USER_ID    = room[1];
            const RECIPIENT_USER_ID = room[2];
            Users.sendMessage(SENDER_USER_ID, RECIPIENT_USER_ID, message);
        case 'status':
    }


});

//https://toster.ru/q/79184
sub_client.psubscribe('message:*', 'status:*', 'game:status:*');