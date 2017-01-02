let config = require('../config.json');
let Token = require('../../../common_libs/token');

let list_users = [];
let cur_num_user = 0;
let count_user = config.test.users;
let table_name = 'users';


while (cur_num_user<count_user) {
    list_users.push({
        login: 'user' + cur_num_user,
        email: 'user' + cur_num_user + '@gmail.com',
        password: Token.createForUserPass(cur_num_user+'Qwerty123!').hash,
        webToken: '',
        webTokenCreate: new Date(),
        gameToken: '',
        gameTokenCreate: new Date(),
        status: 1
    });
    cur_num_user++;
}

module.exports = {
    table_name: table_name,
    list_data: list_users,
    properties: {

    }
}

