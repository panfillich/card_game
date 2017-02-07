const dbConnect = require('./db_connect');

let clear   = require('./clear');
let create  = require('./create');

class callAction{
    static create(callback){
        dbConnect(function () {
            create(callback);
        });
    }

    static clear(callback){
        clear(callback);
    }

    static reload(callback){
        callAction.clear(function () {
            callAction.create(callback);
        });
    }
}

callAction.reload(function () {
    console.log('Final');
});

// /module.exports = callAction;
