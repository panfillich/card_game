let Token       = require('../common_libs/token');
let client      = require('../redis/client');
let KEY         = require('../redis/key');

let db          = require('../db');
let users       = db.users;
let constants   = require('./users').constants;

class Users{
    //Получаем информацию пользователя для авторизации
    //param : [ email, password ]
    static getAuthInfo(param, callback){
        let pass_hash = Token.createForUserPass(param.password).hash;

        users.findOne({
            attributes: ['userId', 'login', 'email', 'status'],
            where: {
                email: param.email,
                password: pass_hash,
                status: constants.status.ACTIVATED
            }
        }).then(function(project) {
            let result = null;
            if (project){
                result = project.dataValues;
            }
            callback(null, result);
        }).catch(function(error){
            callback(error, null);
        });
    }

    //Cоздаем нового пользователя
    static createNewUser(params, callback){
        //Получаем хэш пароля
        let token = Token.createForUserPass(params.password).hash;
        users.create({
            login: params.login,
            email: params.email,
            password: token,
            status: 1//constants.status.INVITED
        }).then(function(project){
            callback(null, project.dataValues);
        }).catch(function(error){
            callback(error, null);
        });
    }

    //Активируем пользователя
    static activateUser(user_id, callback){
        users.update(
            {
                status: constants.status.ACTIVATED
            },
            {
                where: {
                    userId: user_id
                }
            }
        ).then(function(project){
            callback(null, project[0] == 1);
        }).catch(function(error){
            callback(null, error);
        });
    }

    //Получаем все емейлы и логины с шагом в n
    static getAllEmailAndLogin(offset, limit, callback){
        users.findAll({
            attributes: ['userId', 'login', 'email'],
            limit: limit,
            offset: offset
        }).then(function (result) {
            let final_result = [];
            result.forEach(function (instance) {
                final_result.push(instance.dataValues)
            });
            callback(null, final_result);
        }).catch(function(error){
            callback(null, error);
        });
    }
}

//  Прослойка для кэширования, счетчиков и т.д.
//+ методы для работы только с кэшем
class UsersCache extends Users{
    //Создание нового пользователя
    static createNewUser(params, callback){
        let cacheFunction = function (error, result) {
            if(error) {
                //Ничего не делаем, при создании юзера возникли ошибки
                callback(error, null);
            } else {
                //Увеличиваем счетчик, записываем email, login в список
                client.multi([
                    ['sadd', KEY.USERS.EMAILS, result.email],
                    ['sadd', KEY.USERS.LOGINS, result.login],
                    ['incr', KEY.USERS.COUNT]
                ]).exec(function (error, repl) {
                    if (!error) {
                        callback(null, result);
                    } else {
                        callback(error, null);
                    }
                });
            }
        };
        super.createNewUser(params, cacheFunction);
    }

    //Проверяем уникальность email
    static checkUnicEmail(email, callback){
        client.sismember(KEY.USERS.EMAILS, email, function (err, res) {
            if(!err){
                let is_unic = false;
                if(res == 0){
                    is_unic = true;
                }
                callback(null, is_unic);
            } else {
                callback(err);
            }
        });
    }

    //Проверяем уникальность login
    static checkUnicLogin(login, callback){
        client.sismember(KEY.USERS.LOGINS, login, function (err, res) {
            if(!err){
                let is_unic = false;
                if(res == 0){
                    is_unic = true;
                }
                callback(null, is_unic);
            } else {
                callback(err);
            }
        });
    }
}

module.exports = UsersCache;