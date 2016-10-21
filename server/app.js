'use strict';
var config  = require('./config');
var express = require('express');
var app = express();

//Делаем файлы публичными
//К ним теперь можно обратится site/js/somefile.js
//app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(config.publicFolder));

//Обработчики или middleware
var myLogger = function (req, res, next) {
    console.log(config.publicFolder);
    next();
};

app.use(myLogger);
// var initialisers = [
//     require('./config/http'),
//     require('./config/routing')
// ];

app.get('/', function (req, res) {
    res.send('Hello World!');
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
