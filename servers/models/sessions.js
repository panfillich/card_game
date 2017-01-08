let common_libs = '../common_libs/';
let client = require('../redis/client');

let prefix = 'token';
let lifetime = 600;

class Sessions{
    static getSession(token, callback){
        let full_key = prefix + ':' + token;
        client.set("string key", "string val", redis.print);
    }

    static setSession(token, value, callback){
        let full_key = prefix + ':' + token;
        client.setex(full_key, lifetime, value, function (err, res) {
            if(err){
                callback(err, false);
            }
            print()
            callback(false, res);
        });
    }

    static clearSession(token, callback){

    }

    static setLifetime(token, callback){
        // 600 sec = 10 min
        let unix_lifetime = parseInt((+new Date)/1000) + 600;
        let full_key = prefix + ':' + token;
        client.expireat(full_key, unix_lifetime, function (err, result) {
            if(err){
                callback(err, false);
            }
            console.log(result);
            callback(false, true);
        });
    }
}

module.exports = Sessions;