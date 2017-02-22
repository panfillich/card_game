let express     = require('express');
let router      = express.Router();

let Session     = require('../../models/sessions');
let Users       = require('../../models/users');
let ResFormat   = require('../../common_libs/res_format');

//Аутентификация
router.post('/', function(req, res, next) {
    // body = [login (email), password]
    // console.dir(req.connection.remoteAddress)
    if (!req.body.login || !req.body.password){
        let status = 400;
        let json = ResFormat(status, 'Relevant fields not found');
        return res.status(status).send(JSON.stringify(json));
    }

    let param = {
        email: req.body.login,
        password: req.body.password
    };

    // Ищем такого пользователя
    Users.getAuthInfo(param, function (err, result) {
        // Ошибка при поиске
        if (err) return next(err);

        // Не найден пользователь
        if (!result){
            let status = 404;
            let json = ResFormat(status, 'User not found');
            return res.status(status).send(JSON.stringify(json));
        }

        // Пользователь найден
        // Формируем токен
        let param_for_token = {
            login: result.login,
            userId: result.userId,
            email: result.email
        };

        Session.createToken(param_for_token, function (err, token) {
            if (err) next(err);
            let status = 200;
            let json = ResFormat(status, 'Token created',{
                login: result.login,
                token: token.hash,
                date:  token.date
            });
            return res.status(status).send(JSON.stringify(json));
        });
    });
});

module.exports = router;
