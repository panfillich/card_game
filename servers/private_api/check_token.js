let app         = require('./app');
let ResFormat   = require('../common_libs/res_format');

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


    next();
});

