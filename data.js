let getDB    = require('./servers/db/connect');
let getClient = require('./servers/redis/connect');

let dbDropTables = require('./servers/db/gulp/drop');
let dbCreateTables = require('./servers/db/gulp/create');
let dbTestDateCreate = require('./servers/db/gulp/data-test-create');

let redisCreate = require('./servers/redis/gulp/create');
let redisClear  = require('./servers/redis/gulp/clear');

class Data{
    dbConnect(){
        this.db = getDB();
        console.log('Connected to db');
    }

    dbCreate(callback){
        dbCreateTables(this.db, function () {
            if(callback) {
                callback();
            }
        });
    }

    dbDrop(callback){
        dbDropTables(this.db, function () {
            if(callback) {
                callback();
            }
        });
    }

    dbReload(callback){
        dbDropTables(this.db, () => {
            dbCreateTables(this.db, function () {
                if(callback) {
                    callback();
                }
            });
        });
    }

    dbTestDateCreate(callback){
        dbTestDateCreate(this.db, function () {
            if(callback) {
                callback();
            }
        });
    }

    dbTestDateReload(callback){
        this.dbReload(() => {
            this.dbTestDateCreate(callback);
        });
    }


    redisConnect(){
        this.client = getClient();
        console.log('Connected to redis');
    }

    redisClear(callback){
        redisClear(this.client, () => {
            this.client.end(true);
            if(callback) {
                callback();
            }
        });
    }

    redisCreate(callback){
        redisCreate.start(this.client, this.db, () => {
            this.client.end(true);
            if(callback) {
                callback();
            }
        });
    }

    redisReload(callback){
        redisClear(this.client, () => {
            redisCreate.start(this.client, this.db, () => {
                this.client.end(true);
                if(callback) {
                    callback();
                }
            });
        });
    }

}

module.exports = new Data();
