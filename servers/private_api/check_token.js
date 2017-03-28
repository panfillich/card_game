let app         = require('./app');
let ResFormat   = require('../common_libs/res_format');
let Session     = require('../models/sessions');

// Проверяем валидность токена
app.use(function (req, res, next) {
    
    function forbidden() {
        const status = 403;
        const json = ResFormat(status, "You don't have permission to use this end-point");
        return res.status(status).send(JSON.stringify(json));
    }
    
    if(!req.headers.token){
        return forbidden();
    }

    Session.getSession(req.headers.token, function (err, res) {
        if(err){//
            return next(err);
        }

        if(!res){
            return forbidden();
        }

        if(req.headers.token!=res.token){
            return forbidden();
        }

        req.session = '';
        next();
    });

});

