let app = require('../app');

app.use(function(req, res){
    let status = 404;
    res.status(status);
    res.send({
        status: status,
        description: 'Not Found',
        error: 'Not found URL: '+req.url
    });
});
