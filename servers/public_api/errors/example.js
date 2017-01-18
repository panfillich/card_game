let app = require('../app');
let send_error = require('../../common_libs/errors_format');
app.get('/error-example', function(req, res, next){
    return send_error(res, 400, 'Example error in Public API...');
});

