// https://habrahabr.ru/post/193458/#p1
let express = require('express');

let app = express();

let initialisers = [
    require('./config'),
];

let config = {
    express: app,
    basePath: __dirname
};

initialisers.forEach(function(initializer) {
    initializer(config);
});

server = app.listen(3003, function() {
    console.log('api_public listening on port ' + 3003);
});


app.get('/', function (req, res) {
    //console.log(3003);
    res.send("Hello World! It's public-API!");
});

app.get('/ping', function (req, res) {
    //console.log(3002);
    res.send('pong from public-API')
});



