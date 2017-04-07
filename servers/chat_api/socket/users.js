let io = require('../io');

class Users{
    constructor(){
        this.users   = Object.create(null);
        this.friends = Object.create(null);
    }

    createNewUser(param){
        let new_user = new User(param);
        this.users['u'+param.user.userId] = new_user;
        param.friends.forEach((friend) => {
            let Friend = this.friends['f'+friend.userId];
            if(Friend){
                Friend['u'+param.user.userId] = new_user;
                Friend.count++;

            } else {
                this.friends['f'+friend.userId] = {
                    count : 1,
                    ['u'+param.user.userId]:new_user
                };
            }
        });
    }

    deleteUser(userId){
        let User = this.users['u'+userId];
        let friends = User.friends;
        friends.forEach((friend)=>{
            let Friend = this.friends['f'+friend.userId];

            delete Friend[this.users['u'+userId]];
            let count = Friend.count --;
            if(count<=0){
                delete this.friends['f'+friend.userId];
            }

        });
        delete this.users['u'+userId];
    }

    getUser(userId){
        return this.users['u'+userId];
    }

    getFriendIdByRecordId(userId, recordId){
        let User = this.users['u'+userId];
        return User.getFriendIdByRecordId(recordId);
    }

    // пользователь сменил статус (кто)
    changeStatus(userId, status){

    }

    // пользователь отправил сообщение (отправитель получатель сообщение)
    sendMessage(sender_userId, recipient_userId, message){
        // Проверяем наличие получателя
        let User = this.users['u'+recipient_userId];
        if(!User){
            return false;
        }

        // Проверяем наличие отправителя в друззях получателя
        // и узнаем его recordId
        let recordId = User.getFriendRecordIdById(sender_userId);
        if(!recordId){
            return false;
        }

        // Отправляем сообщение
        User.clientIds.forEach(function (clientId) {
            io.sockets.connected[clientId].emit('friend:message', {recordId: recordId, message: message});
        });
    }
}

class User{
    constructor(param){
        // подключения конкретного пользователя
        this.clientIds = [param.clientId];
        this.userId = param.user.userId;
        this.token  = param.user.token;
        this.login  = param.user.login;
        this.status = 'ENTER';
        this.friends = param.friends;
    }

    // Узнаем userID друга по его recordID
    getFriendIdByRecordId(recordId){
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

    // Удаляем друга по его recordId
    // Добавляем нового друга
}

module.exports  = new Users();
