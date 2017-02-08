let create   = require('./create');
let drop     = require('./drop');
let reload   = require('./reload');

let dataTestCreate = require('./data-test-create');
let dataTestReload = require('./data-test-reload');

class callAction{
    static create(callback){
        create(function () {
            if(callback) {
                callback();
            }
        });
    }

    static drop(callback){
        drop(function () {
            if(callback) {
                callback();
            }
        });
    }

    static reload(callback){
        reload(function () {
            if(callback) {
                callback();
            }
        });
    }

    static dataTestCreate(callback){
        dataTestCreate(function () {
            if(callback) {
                callback();
            }
        });
    }

    static dataTestReload(callback){
        dataTestReload(function () {
            if(callback) {
                callback();
            }
        });
    }
}

module.exports = callAction;
