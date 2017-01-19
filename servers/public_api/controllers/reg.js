let express     = require('express');
let router      = express.Router();

let Users       = require('../../models/users');
let sendError   = require('../../common_libs/errors_format');

router.post('/', function(req, res, next) {
    // post : [email, login, password, confirm_password, person]

    //Проверяем обязательные параметры:
    if (!req.body.login ||
        !req.body.password ||
        !req.body.confirm_password ||
        !req.body.email)
    {
        return sendError(res, 400, 'Relevant fields not found');
    }


});

router.get('/confirmation/:token([a-z0-9]{64})', function (req, res) {
    return sendError(res, 200, req.params.token );
});

router.get('/', function (req, res) {
    return sendError(res, 200, '1111' );
});

module.exports = router;