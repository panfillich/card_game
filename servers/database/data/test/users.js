let config = require('../config.json');

let list_users = [];
let cur_num_user = 0;
let count_user = config.test.users;
let table_name = 'users';


while (cur_num_user<count_user) {
    list_users.push({
        login: 'user' + cur_num_user,
        email: 'user' + cur_num_user + '@gmail.com',
        password: '',
        webToken: '',
        webTokenCreate: new Date(),
        gameToken: '',
        gameTokenCreate: new Date()
    });
    cur_num_user++;
}

module.exports = {
    table_name: table_name,
    list_data: list_users,
    properties: {

    }
}

