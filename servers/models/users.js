let Token = require('../common_libs/token');
let db = require('../database');
let users = db.users;
let constants = require('./users').constants;

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
            callback(result, null);
        }).catch(function(error){
            callback(null, error);
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
            status: constants.status.INVITED
        }).then(function(project){
            console.log(project);
            callback(null, project);
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
            callback(null, result);
        }).catch(function(error){
            callback(null, error);
        });
    }
}

module.exports = Users;