module.exports = function(config) {
    let app = config.express;
    app.get('/error-example', function(req, res, next){
        next(new Error('Random error!'));
    });
}
