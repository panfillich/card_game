let express     = require('express');
let router      = express.Router();

let Session     = require('../../models/sessions');
let Users       = require('../../models/users');
let sendError   = require('../../common_libs/errors_format');

//Аутентификация
router.post('/', function(req, res, next) {
    //body = [login (email), password]
    console.dir(req.connection.remoteAddress)
    if (!req.body.login || !req.body.password){
        return sendError(res, 400, 'Relevant fields not found');
    }

    let param = {
        email: req.body.login,
        password: req.body.password
    };

    //Ищем такого пользователя
    Users.getAuthInfo(param, function (result, err) {
        //Ошибка при поиске
        if (err) return next(err);

        //Не найден пользователь
        if (!result){
            let err = new Error('User not found');
            err.status = 400;
            return next(err);
        }

        //Пользователь найден
        //Формируем токен
        let param_for_token = {
            login: result.login,
            userId: result.userId,
            email: result.email
        };

        Session.createToken(param_for_token, function (err, token) {
            if (err) next(err);
            res.send(JSON.stringify({
                login: result.login,
                token: token.hash,
                date:  token.date
            }));
        });
    });
});

module.exports = router;
