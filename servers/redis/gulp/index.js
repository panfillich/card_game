let client    = require('../client');
let clear     = require('./clear');
let create    = require('./create');

class callAction{
    static create(callback){
        create(function () {
            client.end(true);
            if(callback) {
                callback();
            }
        });
    }

    static clear(callback){
        clear(function () {
            client.end(true);
            if(callback) {
                callback();
            }
        });
    }

    static reload(callback){
        clear(function () {
            create(function () {
                client.end(true);
                if(callback) {
                    callback();
                }
            });
        });
    }
}

module.exports = callAction;
