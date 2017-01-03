module.exports = function(config) {
    let app = config.express;
    app.use(function(err, req, res, next){
        let status = err.status || 500;
        res.status(status);
        res.send({
            status: status,
            error: err.message
        });
    });
}