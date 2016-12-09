module.exports = function(config) {
    let app = config.express;
    app.use(function(req, res, next){
        res.status(404);
        // log.debug('Not found URL: %s', req.url);
        res.send({ error: 'Not found' });
        // return;
    });
}