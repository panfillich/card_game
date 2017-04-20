let io = require('../io');

// Пользователи онлайн [key:userId, value:user_inform]
let users   = new Map();

// Их друзья (не обязательно онлайн)
let friends = new Map();


class User{
    constructor(param){
        // подключения конкретного пользователя
        this.clientIds  = [param.clientId];
        this.userId     =  param.user.userId;
        this.token      =  param.user.token;
        this.login      =  param.user.login;
        this.status     =  'ONLINE';
        this.friends    =  param.friends;
    }

    // Узнаем userID друга по его recordID
    getFriendUserIdByRecordId(recordId){
        for(let i = 0; i < this.friends.length; i++){
            if(this.friends[i].recordId == recordId){
                return this.friends[i].userId;
            }
        }
        return false;
    }

    // Узнаем recordID друга по его userID
    getFriendRecordIdById(userId){
        for(let i = 0; i < this.friends.length; i++){
            if(this.friends[i].userId == userId){
                return this.friends[i].recordId;
            }
        }
        return false;
    }

    // Добавляем новый clientId
    setClientId(clientId){
        this.clientIds.push(clientId);
    }

    // Удаляем clientId
    delClientId(clientId){
        const POSITION = this.clientIds.indexOf(clientId);

        if(POSITION == -1){
            return false;
        }

        this.clientIds.splice(POSITION, 1);
        return true;
    }

    getCountConnection(){
        return this.clientIds.length;
    }

    // Изменяем статус пользователя
    changeStatus(new_status){
        this.status = new_status;
    }
}


class Users{
    // Создаем нового пользователя
    static createNewUser(param){
        const USER_ID = param.user.userId

        // Проверяем, может быть этот пользователь уже существует
        if(users.has(USER_ID)){
            let user = users.get(USER_ID);
            const CLIENT_ID = param.clientId;
            user.setClientId(CLIENT_ID);
            return user
        }

        // ...если нет, то создаем нового
        let new_user = new User(param);

        users.set(USER_ID, new_user);

        param.friends.forEach((friend) => {
            const FRIEND_ID = friend.userId;

            if(friends.has(FRIEND_ID)){
                // f_users - друзья онлайн пользователя c userId = FRIEND_ID
                let f_users = friends.get(FRIEND_ID);
                f_users.set(USER_ID, new_user);

            } else {
                let f_users = new Map();
                f_users.set(USER_ID, new_user);
                friends.set(FRIEND_ID, f_users);
            }
        });

        return new_user;
    }

    // Удаляем одно соединение
    static delOneConnection(userId, clientId){
        let user = users.get(userId);
        user.delClientId(clientId);
        // если соединение было всего одно - удаляем пользователя
        if(user.getCountConnection == 0){
            Users.delUser(userId);
        }
    }

    // Удаляем все соединения / полностью удаляем пользователя
    // Добавить функционал по отправке статуса
    static delUser(userId){
        let user = users.get(userId);
        let users_friends = user.friends;
        users_friends.forEach(function (users_friends) {
            let friend = friends.get(users_friends.userId);
            if(friend.has(userId)){
                friend.delete(userId);
            }
        });
        users.delete(userId);
    }

    // Отправка сообщения
    static sendMessage(type, param){
        if(type == 'private') {  // Приватное сообщение от друга
            message_for_friend:
            {
                // Проверяем наличие получателя
                if (!users.has(param.recipient_userId)) {
                    break message_for_friend;
                }

                // Получатель найден
                let user = users.get(param.recipient_userId);

                // Проверяем наличие отправителя в друззях получателя
                // и узнаем его recordId
                let recordId = user.getFriendRecordIdById(param.sender_userId);
                if (!recordId) {
                    break message_for_friend;
                }

                // Отправитель найден
                // Отправляем сообщение
                user.clientIds.forEach(function (clientId) {
                    io.sockets.connected[clientId].emit('message', {
                        type: 'friend',
                        recordId: recordId,
                        text: param.text,
                        time: param.time
                    });
                });
            }

            message_for_self:
            {
                // Проверяем наличие отправителя
                if (!users.has(param.sender_userId)) {
                    break message_for_self;
                }

                // Отправитель найден
                let user = users.get(param.sender_userId);

                // Проверяем находится ли получатель в друзьях отправителя
                let recordId = user.getFriendRecordIdById(param.recipient_userId);
                if (!recordId) {
                    break message_for_self;
                }

                // Получатель найден
                // Отправляем сообщение
                user.clientIds.forEach(function (clientId) {
                    io.sockets.connected[clientId].emit('message', {
                        type: 'self',
                        recordId: recordId,
                        text: param.text,
                        time: param.time
                    });
                });
            }
        }
    }

    // Смена статуса
    static changeStatus(userId, status){
        // Ищем друзей в онлайне
        if(!friends.has(userId)){
            return false;
        }
        // Нашли
        let f_users = friends.get(userId);

        // Проходимся по всем друзьям в онлайне
        for(let f_userId of f_users.keys()) {
            let user = f_users.get(f_userId);

            // Находим recordId друга
            const RECORD_ID = user.getFriendRecordIdById(userId);

            // Проходимся по всем соединениям
            user.clientIds.forEach(function (clientId) {
                io.sockets.connected[clientId].emit('friend:status', {
                    status: status,
                    recordId: RECORD_ID
                });
            });
        }
    }
}

module.exports  =  Users;
