let ResFormat   = require('../../common_libs/res_format');
let app = require('../app');
app.use(function(err, req, res, next){
    let status = err.status || 500;
    let json = ResFormat(status, err.message);
    return res.status(status).send(JSON.stringify(json));
});
