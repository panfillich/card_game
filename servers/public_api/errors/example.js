let app = require('../app');
let ResFormat = require('../../common_libs/res_format');
app.get('/error-example', function(req, res, next){
    let status = 400;
    let json = ResFormat(status, 'Example error in Public API...');
    return res.status(status).send(JSON.stringify(json));
});

