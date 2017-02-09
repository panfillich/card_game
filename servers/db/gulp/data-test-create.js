const config = require('../data/config');
const folder = __dirname + '/../data/test';
const fs = require('fs');

let log   = console.log;
let cLog  = function (message) {
    log('\x1b[33m%s\x1b[0m: ', 'Creating test data', message);  //yellow
}

let create = function (db, callback) {
    let queryInterface  = db.sequelize.queryInterface;
    let DataTypes       = db.sequelize.Sequelize;

    cLog('start');  //yellow

    let finalAction = function () {
        cLog('completed successfully');
        if(callback) {
            callback();
        }
    }

    let data_func = [];

    fs.readdirSync(folder).forEach(file => {
        data_func.push(require('../data/test/' + file));
    });

    let current_iterate = 0;

    let callbackIterate = function () {
        current_iterate++;
        if(data_func.length == current_iterate){
            finalAction();
        } else {
            data_func[current_iterate](queryInterface, DataTypes, callbackIterate);
        }
    }

    data_func[0](queryInterface, DataTypes, callbackIterate);
};

module.exports = create;


