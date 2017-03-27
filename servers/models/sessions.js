let client = require('../redis/client');
let Token = require('../common_libs/token');

const TOKEN_PREFIX  = 'token';
const USER_PREFIX = 'user';
const LIFETIME = 600;

class UserSession{
    constructor(userId){
        this.userId = userId;
    }
}

class Sessions{
    switchToRedis(client){
        if(client){
            this.client = client;
            return true;
        }
        return false;
    }

    createNewSession(param, callback){
        let token = Token.createForUser(param.email);
        this._checkUserSession(param.userId, function (err, result) {
            if(err){
                callback(err, false);
            } else if(result){
               // используем готовый user:id (только поменяем ему token)

            } else {
               // создаем новый user:id

            }
        });
    }

    // Создаем пользовательскую сессию user:id
    _createUserSession(){

    }

    // Проверям существует ли ключ user:id, если существует то добавляем ему время жизни
    _checkUserSession(userId, callback){
        let client = this.client;
        const KEY = [USER_PREFIX, userId].join(':');

        client.expire(KEY, LIFETIME, function (err, res) {
            if(err){
                callback('Error in RAM, when we set lifetime to user session', false);
            } else if (res){
                return callback(null, true);
            } else {
                return callback(null, false);
            }
        });
    }

    createSession(){

    }


    // Установить токен / создать сессию
    /*createToken(param, callback){

        let token = Token.createForUser(param.email);

        this.setSessionFields(token.hash, param, function (err, res) {
            if (err) {
                callback(err, null)
            }

            if (!res) {
                let err_message = "Can't create token in REDIS"
                callback(err, null)
            }

            callback(null, token);
        })
    }

    // Получить всю сессию
    getSessionAll(token, callback){
        let client = this.client;

        let full_key = [prefix, token].join(':');

        client.multi([
            ['hgetall', full_key],
            ['expire', full_key, lifetime]
        ]).exec(function (err, res) {
            if (err) {
                callback(err, null)
            }
            callback(null, res[0])
        });
    }

    // Получть часть данных
    // fields - массив
    getSessionFields(token, fields, callback){
        let client = this.client;
        let full_key = [prefix, token].join(':');
        let hmget = ['hmget', full_key];
        fields.forEach(function (field) {
            hmget.push(field)
        });
        client.multi([
            hmget,
            ['expire', full_key, lifetime]//
        ]).exec(function (err, res) {
            if (err) {
                callback(err, null)
            }
            let result = {};
            fields.forEach(function (field, key) {
                result[field] = res[key]
            });
            callback(null, result)
        });
    }

    // Установить часть данных/все данные в сессию
    // fields - обьект
    setSessionFields(token, fields, callback){
        let client = this.client;
        let full_key = [prefix, token].join(':');
        let hmset = ['hmset', full_key];
        for (let key in fields) {
            hmset.push(key);
            hmset.push(fields[key]);
        }
        client.multi([
            hmset,
            ['expire', full_key, lifetime]//
        ]).exec(function (err, res) {
            if (err) {
                callback(err, null)
            }
            callback(null, res[0]=='OK')
        });
    }

    // Полностью удалить сессию
    clearSessionAll(token, callback){
        let client = this.client;
        let full_key = [prefix, token].join(':');
        client.multi([
            ['del', full_key],
            ['expire', full_key, lifetime]
        ]).exec(function (err, res){
            if (err) {
                callback(err, null)
            }
            callback(null, res)
        });
    }

    // Удалить часть полей
    // fields - массив
    clearSessionFields(token, fields, callback){
        let client = this.client;
        let full_key = [prefix, token].join(':');
        let operations = [];
        fields.forEach(function (field) {
            operations.push(['hdel', full_key, field])
        });
        client.multi(operations).exec(function (err, res) {
            if (err) {
                callback(err, null)
            }
            callback(null, res)
        });
    }

    // Установить время жизни
    setLifetime(token, callback){
        let client = this.client;
        let full_key = [prefix, token].join(':');
        client.expire(full_key, lifetime, function (err, res) {
            if(err){
                callback(err, false);
            }
            callback(null, res);
        });
    }*/
}

module.exports = new Sessions();