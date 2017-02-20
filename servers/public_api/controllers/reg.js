let express     = require('express');
let router      = express.Router();

let Users       = require('../../models/users');
let Validate    = require('../../common_libs/validate');
let ResFormat   = require('../../common_libs/res_format');

router.post('/', function(req, res, next) {
    // post : [email, login, password, confirm_password, person]
    let fields = [
        { name : 'email',            type : 'email',     required: true, value: req.body.email},
        { name : 'login',            type : 'login',     required: true, value: req.body.login},
        { name : 'password',         type : 'password',  required: true, value: req.body.password},
        { name : 'confirm_password', type : 'password',  required: true, value: req.body.confirm_password},
        { name : 'language',         type : 'language',  required: true, value: req.body.language}
    ];

    let result = Validate.checkFullValidate(fields);

    // Проверяем валидацию полей
    if(!result.is_valid){
        let status = 400;
        let json = ResFormat(status, 'Required fields not found or fields not valid', result.detail);
        return res.status(status).send(JSON.stringify(json));
    }

    // Проверяем совпадение паролей
    if(req.body.password != req.body.confirm_password){
        let status = 400;
        let json = ResFormat(status, 'Passwords do not match', {invalid_fields:['password', 'confirm_password']});
        return res.status(status).send(JSON.stringify(json));
    }

    // Проверяем уникальность логина и email, надежность пароля
    Users.checkUnicEmail(req.body.email, function (err, is_unic) {
        if(err) return next(err);
        if(!is_unic) {
            let status = 400;
            let json = ResFormat(status, "Email is't unique", {non_unique_field:['email']});
            return res.status(status).send(JSON.stringify(json));
        }

        Users.checkUnicLogin(req.body.login, function (err, is_unic) {
            if(err) return next(err);
            if(!is_unic) {
                let status = 400;
                let json = ResFormat(status, "Login is't unique", {non_unique_field:['login']});
                return res.status(status).send(JSON.stringify(json));
            }

            // Создаем нового пользователя
            // Если логин и email уникальны и валидны
            const params = {
                login: req.body.login,
                email: req.body.email,
                password: req.body.password};
            Users.createNewUser(params, function (err, result) {
                if(err) return next(err);

                let status = 200;
                let json = ResFormat(status, "User was created", {
                    login: result.login,
                    email: result.email
                });
                return res.status(status).send(JSON.stringify(json));
            });
        });
    });
});

router.get('/confirmation/:token([a-z0-9]{64})', function (req, res) {
    return sendError(res, 200, req.params.token );
});

router.get('/', function (req, res) {
    let status = 400;
    let json = ResFormat(status, 'test', 'fs');
    // return sendError(res, 200, '1111' );
    return res.status(status).send(JSON.stringify(json));
});

module.exports = router;