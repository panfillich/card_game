let getDB    = require('../connect');

// let create   = require('./create');
let drop     = require('./drop');
// let reload   = require('./reload');

// let dataTestCreate = require('./data-test-create');
// let dataTestReload = require('./data-test-reload');

class CallAction{
    connect(){
        this.db = getDB();
        console.log('Connected to db');
    }

    // create(callback){
    //     create(this.db, function () {
    //         if(callback) {
    //             callback();
    //         }
    //     });
    // }

    drop(callback){
        drop(this.db, function () {
            if(callback) {
                callback();
            }
        });
    }

    // static reload(callback){
    //     reload(function () {
    //         if(callback) {
    //             callback();
    //         }
    //     });
    // }
    //
    // static dataTestCreate(callback){
    //     dataTestCreate(function () {
    //         if(callback) {
    //             callback();
    //         }
    //     });
    // }
    //
    // static dataTestReload(callback){
    //     dataTestReload(function () {
    //         if(callback) {
    //             callback();
    //         }
    //     });
    // }
}

module.exports = new CallAction();
