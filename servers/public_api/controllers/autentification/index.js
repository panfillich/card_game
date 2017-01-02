module.exports = function(config) {
    let app = config.express;
    app.post('/auth', function(req, res) {
        console.dir(req);
        res.send('This is not implemented now');
    });
}