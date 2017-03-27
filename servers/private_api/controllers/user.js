let express     = require('express');
let router      = express.Router();

let Session     = require('../../models/sessions');
let Users       = require('../../models/users');
let ResFormat   = require('../../common_libs/res_format');

router.get('/me', function(req, res, next) {
    return res.status('200').send(JSON.stringify({'test':111}));
});

module.exports = router;
