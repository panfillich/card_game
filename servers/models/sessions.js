let common_libs = '../common_libs/';
let client = require('../redis/client');

let prefix = 'token';
let lifetime = 600;

class Sessions{
    static getSession(token, callback){
        let full_key = prefix + ':' + token;
        client.multi([
            ['hgetall', full_key],
            ['expire', full_key, 60]
        ]).exec(function (err, repl) {
            if (err) {
                callback(err, null)
            }
            callback(null, repl)
        });

    }

    static setSession(token, value, callback){
        let full_key = prefix + ':' + token;
        let hmset = ['hmset', full_key]
        for (let key in value) {
            hmset.push(key);
            hmset.push(value[key]);
        }
        client.multi([
            hmset,
            ['expire', full_key, 600]//
        ]).exec(function (err, repl) {
            if (err) {
                callback(err, null)
            }
            callback(null, repl)
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