module.exports = function(config) {
    let app = config.express;
    app.get('/api/articles', function(req, res) {
        res.send('This is not implemented now');
    });

    app.get('/', function (req, res) {
        var sess = req.session;
        if (sess.views) {
            sess.views++;
        }else{
            sess.views = 1;
        }
        console.log(sess);
        res.send("Hello World! It's public-API99999999!");
    });

    app.get('/ping', function (req, res) {
        //console.log(3002);
        res.json({
            pong: true
        })
    });
}