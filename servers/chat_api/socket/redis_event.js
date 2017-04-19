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
        // redis-cli: publish message:friend:1:2 '{"text":"test", "time": 1492590630153}'
        // redis-cli: publish message:self:1     '{"text":"test", "time": 1492590630153}'
        case 'message':
            const TYPE = room[1];

            // Сообщение от друга
            if(TYPE == 'private'){
                const data = JSON.parse(str_data);
                Users.sendMessage(TYPE, {
                    recipient_userId : room[2],
                    sender_userId : room[3],
                    text:   data.text,
                    time:   data.time
                });
            }

        // redis-cli: publish status:2 'ONLINE'
        // redis-cli: publish status:2 'OFFLINE'
        case 'status':
            const USER_ID = Number(room[1]);
            Users.changeStatus(USER_ID, str_data);
    }


});

//https://toster.ru/q/79184
sub_client.psubscribe('message:*', 'status:*', 'game:status:*');