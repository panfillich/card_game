let express     = require('express');
let router      = express.Router();

let Users       = require('../../models/users');
let Validate    = require('../../common_libs/validate');
let sendError   = require('../../common_libs/errors_format');

router.post('/', function(req, res, next) {
    // post : [email, login, password, confirm_password, person]

    let fields = [
        { name : 'email',            type : 'email',     required: true },
        { name : 'login',            type : 'login',     required: true },
        { name : 'password',         type : 'password',  required: true },
        { name : 'confirm_password', type : 'password',  required: true },
        { name : 'language',         type : 'language',  required: true }
    ];

    let result = Validate.checkFullValidate(req.body, fields);

    // Проверяем валидацию полей
    if(!result.is_valid){
        return sendError(res, 400, 'Required fields not found or fields not valid', result.detail);
    }

    // Проверяем совпадение паролей
    if(req.body.password != req.body.confirm_password){
        return sendError(res, 400, 'Passwords do not match', {invalid_fields:['password', 'confirm_password']});
    }

    // Проверяем уникальность логина и email, надежность пароля


    // Отправляем email

    return sendError(res, 200, 'OK' );


});

router.get('/confirmation/:token([a-z0-9]{64})', function (req, res) {
    return sendError(res, 200, req.params.token );
});

router.get('/', function (req, res) {
    return sendError(res, 200, '1111' );
});

module.exports = router;