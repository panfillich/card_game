
class Users{

}

//
let friends_in_socket = [];
let users_in_socket   = [];

class Friends{

}

class User{
    constructor(param){
        // подключения конкретного пользователя
        this.cocket_ids = [];
        this.userId         = param.user.userId;
        this.token          = param.user.token;
        this.login          = param.user.login;
        this.current_status = '';
        this.friends        = {};
    }
}

class Friend{

}

export default {
    Friends: Friends,
    Users: Users
}
