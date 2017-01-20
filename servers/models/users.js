let Token = require('../common_libs/token');
let db = require('../database');
let users = db.users;
let constants = require('../database/schema/users').constants;

class Users{
    //Получаем информацию пользователя для авторизации
    //param : [ email, password ]
    static get_auth_info(param, callback){
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
        let token = Token.createForUserPass(param.password);
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

    //получаем токен и дату
    //param {
    //  login,
    //  type,
    //  token,
    //  tokenCreate
    //}
    static get_token(param, callback){
        let where = {
            login: param.login
        }

        let attributes = ['login'];

        switch(param.type){
            case 'web':
                attributes.push('webToken', 'webTokenCreate');
                break;
            case 'game':
                attributes.push('gameToken', 'gameTokenCreate');
                break;
        }

        where[attributes[1]] = param.token;
        where[attributes[2]] = param.tokenCreate;

        users.findOne({
            attributes: attributes,
            where: where
        }).then(function(project) {
            let result = null;
            if (project){
                let data = project.dataValues;
                result = {
                    login:          data.login,
                    token:          data[attributes[1]],
                    tokenCreate:    data[attributes[2]]
                }
            }
            callback(result, null);
        }).catch(function(error){
            callback(null, error);
        });
    }

    //Устанавливаем токен и дату
    //param = {
    //  userId: number,
    //  email:  string,
    //  type:   string (['web', 'game'])
    //}
    static set_token(param, callback){
        let token = Token.createForUser(param.email);
        let set = {};

        switch(param.type){
            case 'web':
                set.webToken = token.hash;
                set.webTokenCreate = token.date;
                break;
            case 'game':
                set.gameToken = token.hash;
                set.gameTokenCreate = token.date;
                break;
        }

        users.update(
            set,
            { where: { userId: param.userId}}
        ).then(function (project) {
            if(project == 1) {
                callback(token, null);
            } else {
                let error = new Error("User's token not update.")
                callback(null, error);
            }
        }).catch(function(error){
            callback(null, error);
        });
    }

    //создаем нового пользователя
    set_new_user(param){

    }
}

module.exports = Users;