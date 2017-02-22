let Token       = require('../common_libs/token');
let KEY         = require('../redis/key');
let constants   = require('../db/schema/users').constants;

class Users{
    //Подключаемся к базе
    switchToDB(db){
        if(db){
            this.db = db;
            this.users = this.db.users;
            return true;
        }
        return false;
    }

    //Получаем информацию пользователя для авторизации
    //param : [ email, password ]
    getAuthInfo(param, callback){
        let users = this.users;

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
    createNewUser(params, callback){
        let users = this.users;

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
    activateUser(user_id, callback){
        let users = this.users;
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

    // Получаем все емейлы и логины с шагом в n
    getAllEmailAndLogin(offset, limit, callback){
        let users = this.users;
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

    // Получить кол-во всех пользователей
    getCountAllUsers(callback){
        let users = this.users;
        users.count()
            .then(function (count) {
                callback(null, count);
            }).catch(function(error){
                callback(error, null);
            });
    }
}

//  Прослойка для кэширования, счетчиков и т.д.
//+ методы для работы только с кэшем
class UsersCache extends Users{

    switchToRedis(client){
        if(client){
            this.client = client;
            return true;
        }
        return false;
    }

    //Создание нового пользователя
    createNewUser(params, callback){
        let client = this.client;

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
    checkUnicEmail(email, callback){
        let client = this.client;

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
    checkUnicLogin(login, callback){
        let client = this.client;

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

module.exports = new UsersCache();