let express = require('express');
let router = express.Router();

router.get('/api/articles', function(req, res) {
    res.send('This is not implemented now');
});

router.get('/', function (req, res) {
    res.send("Hello World! It's public-API99999999!");
});

router.get('/tet', function (req, res) {
    //console.log(3002);
    res.json({
        pong: true
    })
});

module.exports = router;