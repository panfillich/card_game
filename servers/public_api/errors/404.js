let app = require('../app');

app.use(function(req, res){
    let status = 404;
    res.status(status);
    res.send({
        status: status,
        error: ('Not found URL: %s', req.url)
    });
});
