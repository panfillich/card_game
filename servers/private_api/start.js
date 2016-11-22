var express = require('express');
var app = express();

server = app.listen(3002, function() {
    console.log('api_private listening on port ' + 3002);
});

app.get('/', function (req, res) {
    res.send("Hello World! It's private-API!");
});

app.get('/ping', function (req, res) {
   res.send('pong from private-API')
})



