var config  = require('./config');
var serverMode = config.serverMode;

var express = require('express');
var app = express();

const ENV_NODE = process.env.NODE_ENV || 'prod';

//Шаблонизатор
var nunjucks  = require('nunjucks');
nunjucks.configure('server/views', {
    autoescape: true,
    express: app
});

// Шаблонизатор ejs
// app.set('views', __dirname+'/views');
// app.set('view engine', 'ejs');

//Контроллер страниц
var pages = require(__dirname + '/controllers/pages')

//Делаем файлы публичными
//К ним теперь можно обратится site/js/somefile.js
//app.use('/static', express.static(__dirname + '/public'));
//app.use(express.static(__dirname + config.publicFolder));
app.use(express.static('./public'));

//Обработчики или middleware
var myLogger = function (req, res, next) {
    // console.log(config.publicFolder);
    next();
};

//Устанавливаем переменные для шаблонов
app.use(function (req, res, next) {
    var resource;
    switch (true){
        case ENV_NODE == 'dev':
            resource = config.publicResource.common.dev;
            break;
        case ENV_NODE == 'prod':
            resource = config.publicResource.common.prod;
            break
    }
    app.locals.bootstrapJs  = resource.js.bootstrap;
    app.locals.bootstrapCss = resource.css.bootstrap;
    app.locals.jquery       = resource.js.jquery;
    app.locals.cocos        = resource.js.cocos;
    next()
})

app.use(myLogger);

app.get('/', function (req, res) { res.redirect('home') });
app.get('/game', function (req, res) {res.redirect('home')});
app.get('/home', pages.home)

module.exports = app;
