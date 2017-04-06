class Users{
    constructor(){
        this.users   = new Object.create(null);
        this.friends = new Object.create(null);
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
}

class User{
    constructor(param){
        // подключения конкретного пользователя
        this.clientId = [param.cocket_id];
        this.userId = param.user.userId;
        this.token  = param.user.token;
        this.login  = param.user.login;
        this.status = 'ENTER';
        this.friends = param.friends;
    }

    // Узнаем userID друга по его recordID
    getFriendsIdByRecordId(recordId){
        for(let i = 0; i < this.friends.length; i++){
            if(this.friends[i] == recordId){
                return this.friends[i].userId;
            }
        }
        return null;
    }

    // Удаляем друга по его recordId
    // Добавляем нового друга
}

class Friend{

}

export default new Users;
