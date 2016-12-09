module.exports = function(config) {
    let app = config.express;
    app.get('/api/articles', function(req, res) {
        res.send('This is not implemented now');
    });

    app.get('/', function (req, res) {
        console.log(3003);
        res.send("Hello World! It's public-API99999999!");
    });

    app.get('/ping', function (req, res) {
        //console.log(3002);
        res.json({
            pong: true
        })
    });
}