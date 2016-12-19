let list_users = [];
let current_num = 0;
let count_user = 10;

let add_data = function (queryInterface, Sequelize) {
    while (current_num<count_user) {
        list_users.push({
            login: 'user' + current_num,
            email: 'user' + current_num + '@gmail.com',
            password: '',
            token: '',
            createdAt: new Date(),
            updatedAt: new Date()
        })
        current_num++;
    }
    queryInterface.bulkInsert('users', list_users);
}

module.exports = {
    up: add_data
}