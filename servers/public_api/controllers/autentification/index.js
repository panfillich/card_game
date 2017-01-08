let send_error = require('../../../common_libs/errors_format');

module.exports = function(storage) {
    let app = storage.express;
    let users = storage.models.users;
    //Аутентификация
    app.post('/auth', function(req, res, next) {
        //body = [login (email), password]
        console.dir(req.connection.remoteAddress)
        if (!req.body.login || !req.body.password){
            return send_error(res, 400, 'Relevant fields not found');
        }

        let param = {
            email: req.body.login,
            password: req.body.password
        };

        //Ищем такого пользователя
        users.get_auth_info(param, function (result, err) {
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
                userId: result.userId,
                email: result.email,
                type: 'web'
            };
            users.set_token(param_for_token, function (token, err) {
                if(err) next(err);
                res.send(JSON.stringify({
                    login: result.login,
                    token: token.hash,
                    date: token.date
                }));
            });
        });
    });
}

