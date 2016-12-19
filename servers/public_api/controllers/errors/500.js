module.exports = function(config) {
    let app = config.express;
    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        // log.error('Internal error(%d): %s',res.statusCode,err.message);
        res.send({ error: err.message });
        return;
    });
}