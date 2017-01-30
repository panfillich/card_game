let config          = require('../config');
let constants       = require('../../schema/users').constants;
let get_rand_attr   = require('../../../common_libs/random/get_rand_attr');

const Token         = require('../../../common_libs/token');
const LoadPack      = require('../LoadPack');

let log             = function(message){
    console.log(`[${constants.table_name}] ` + message);
}

function createNewUser(param) {
    let cur_num_user = param.current_records;
    return [{
        login: 'user' + cur_num_user,
        email: 'user' + cur_num_user + '@gmail.com',
        password: Token.createForUserPass(cur_num_user+'Qwerty123!').hash,
        webToken: '',
        webTokenCreate: new Date(),
        gameToken: '',
        gameTokenCreate: new Date(),
        status: 1
    }];
}

module.exports = function (queryInterface, DataTypes, callback) {

    let loadPack = new LoadPack({
        createNewIteration: createNewUser,
        all_iterations:     config.test.users.count,
        table_name:         constants.table_name,
        pack_iterations:    10000
    });

    console.log(`[${constants.table_name}] start creating`);

    loadPack.insert(queryInterface, DataTypes, callback);
}

