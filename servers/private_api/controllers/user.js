let express     = require('express');
let router      = express.Router();

let ResFormat   = require('../../common_libs/res_format');

router.get('/me', function(req, res, next) {
    let status = 200;
    let res_data = {
        email: req.session.get('email'),
        login: req.session.get('login')
    }
    let json = ResFormat(status, 'User information', res_data);
    return res.status(status).send(JSON.stringify(json));
});



module.exports = router;
