let ResFormat   = require('../../common_libs/res_format');
let app = require('../app');

app.use(function(req, res){
    let status = 404;
    let json = ResFormat(status, 'Not found URL: '+req.url);
    return res.status(status).send(JSON.stringify(json));
});
