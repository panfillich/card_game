const config     = require('../config');
const friends    = require('../../consts/friends');
const LoadPack   = require('../LoadPack');
let get_rand_int = require('../../../common_libs/random/get_rand_int');

const COUNT_USER = config.test.users.count;

function createNewCollection(param) {
    let cur_num_user = param.current_records;
    let coint_friends_on_this_iter = get_rand_int(
        config.test.friends.count.min,
        config.test.friends.count.max
    );

    // если друзья выходят за пределы общего кол-ва пользователей:
    if((cur_num_user + coint_friends_on_this_iter)>COUNT_USER){
        coint_friends_on_this_iter = COUNT_USER - cur_num_user;
    }
    let friend_iter = 1;
    let collection = [];

    while (friend_iter <= coint_friends_on_this_iter){
        collection.push({
            userId: cur_num_user,
            friendId: cur_num_user + friend_iter
        },
        {
            userId: cur_num_user + friend_iter,
            friendId: cur_num_user
        });
        friend_iter++;
    }

    // Если последний пользователь, то добавим ему в друзья первого, чтобы не было ошибки
    if(collection.length == 0){
        collection.push({
            userId: 1,
            friendId: cur_num_user
        },
        {
            userId: cur_num_user,
            friendId: 1
        });
    }

    return collection;
}

module.exports = function (queryInterface, DataTypes, callback) {

    let loadPack = new LoadPack({
        createNewIteration: createNewCollection,
        all_iterations:     config.test.users.count,
        table_name:         friends.table_name,
        pack_iterations:    5000
    });

    console.log(`[${friends.table_name}] start creating`);

    loadPack.insert(queryInterface, DataTypes, callback);
}

