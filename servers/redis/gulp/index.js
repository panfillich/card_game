const dbConnect = require('./db_connect');
const create = require('./create');

let callAction  = function (type, callback) {
    switch (type){
        case 'create':
            break;
        case 'clear':
            break;
        case 'reload':
            break;
    };
};

module.exports = callAction;

