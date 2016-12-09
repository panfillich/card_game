// https://habrahabr.ru/post/193458/#p1
let express = require('express');

let app = express();
let log = require('./logger')(module);

let initialisers = [
    require('./config'),
    require('./controllers')
]; ////////////////////////////////

let config = {
    express: app,
    basePath: __dirname
};

initialisers.forEach(function(initializer) {
    initializer(config);
});
 //
server = app.listen(3003, function() {
    console.log('api_public listening on port ' + 3003);
});





