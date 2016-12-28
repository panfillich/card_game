let list_users = [];
let cur_num_user = 0;
let count_user = 10;

module.exports = {
    up: function (queryInterface, Sequelize) {
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
        queryInterface.bulkInsert('users', list_users);
    },

    down: function (queryInterface, Sequelize) {

    }
};