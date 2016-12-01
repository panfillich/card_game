var express = require('express');
var app = express();

server = app.listen(3003, function() {
    console.log('api_public listening on port ' + 3003);
});

app.get('/', function (req, res) {
    //console.log(3003);
    res.send("Hello World! It's private-API!");
});

app.get('/ping', function (req, res) {
    //console.log(3002);
    res.send('pong from public-API')
});



