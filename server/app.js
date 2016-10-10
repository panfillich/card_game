'use strict';

var express = require('express');
var app = express();

// var initialisers = [
//     require('./config/http'),
//     require('./config/routing')
// ];

app.get('/', function (req, res) {
    res.send('Hello2 World!');
});

// var config = {
//     express: app,
//     basePath: __dirname
// };

// initialisers.forEach(function(initializer) {
//     initializer.setup(config);
// });
//
module.exports = app;
