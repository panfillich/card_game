let Users = require('./users');

// Основной клиент
let main_client = require('../../redis/client');

// Создаем еще одного клиента для прослушки
let createNewClient = require('../../redis/connect');
let sub_client  = createNewClient();


sub_client.on('pmessage', function(pattern, channel, str_data) {
    /*main_client.get('tester', function (err,  data) {
        console.log(err);
        console.log(data);
    });*/

    var room = channel.split(":");

    switch(room[0]){
        case 'message':
            const TYPE = room[1];

            // Сообщение от друга
            if(TYPE == 'friend'){
                const RECIPIENT_USER_ID = room[2];
                const SENDER_USER_ID    = room[3];
                const data = JSON.parse(str_data);
                Users.sendMessage(TYPE, RECIPIENT_USER_ID, SENDER_USER_ID, data.text, data.time);
            }


        case 'status':
    }


});

//https://toster.ru/q/79184
sub_client.psubscribe('message:*', 'status:*', 'game:status:*');