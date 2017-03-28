// подключаем gulp
let gulp        = require('gulp');

//-------------| Серверная часть |-------------------------//
// Общий шаблон/класс для работы с pm2
let Pm2_task    = require('./pm2_task.js');

let public_api  = new Pm2_task('public_api','pub_api');
let private_api = new Pm2_task('private_api','priv_api');

var gutil = require("gulp-util");

// Подключаем webpack (ES7->ES6 and Many JS -> One JS)
var webpack = require("webpack");

let WebpackDevServer = require('webpack-dev-server');

//Таски, которые запускают процессы
public_api.start();
private_api.start();
gulp.task('start_servers', [
    public_api.startName,
    private_api.startName
]);

//Таски, которые перезапускают процессы
public_api.reload();
private_api.reload();

//Мониторинг изменения файлов в папке servers
//и перезапуск соответствующего процесса
gulp.task('check_servers', function () {
    public_api.watch();
    private_api.watch();
});
//---------------------------------------------------------//


//-------------| Клиентская часть |------------------------//

let webpackConfig = require("./webpack.config.js");

gulp.task('webpack-dev-server', function (callback) {

    var config = Object.create(webpackConfig);

    //config.devtool = 'eval';
    // config.debug = true;
    //
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(config), {
        hot: true,
        inline: true,
        port: 3000,
        host: '0.0.0.0',
        watchOptions: {
             aggregateTimeout: 30,
             poll: true // is this the same as specifying --watch-poll?
        },
        publicPath: "/public/",
        contentBase: __dirname + "/public/",
        stats: {
            colors: true
        },
        // historyApiFallback: {
        //     index: 'index.html'
        // }
        proxy:[
            {   context: ['/pub-api/**'],
                target: 'http://localhost:3003',
                pathRewrite: {'/pub-api': '/'}
            },
            {   context: ['/priv-api/**'],
                target: 'http://localhost:3002',
                pathRewrite: {'/pub-api': '/'}
            },
            {   context: ['/*.*'],
                target: 'http://localhost:3000/public'
            },
            {   context: ['/**'],
                target: 'http://localhost:3000',
                bypass: function(req, res, proxyOptions) {
                    return '/index.html';
                }
            }
        ]
    }).listen(3000, '0.0.0.0', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/index.html');
    });
});

gulp.task('default', ['start_servers', 'check_servers', 'webpack-dev-server']);
//---------------------------------------------------------//


//-------------| Работа с данными / кэшем |----------------//
let data = require('./data');

// REDIS:

// Подключаемся к redis
gulp.task('redis:connect', function (callback) {
    data.redisConnect();
    callback();
});

// Очищаем весь кэш
gulp.task('redis:clear', ['redis:connect'], function (callback) {
    data.redisClear(callback);
});

// Кэшируем, создаем списки + очереди
gulp.task('redis:create',  ['redis:connect', 'db:connect'], function (callback) {
    data.redisCreate(callback);
});

// Перезаписываем кэш
gulp.task('redis:reload', ['redis:connect', 'db:connect'], function (callback) {
    data.redisReload(callback);
});


// DB:

// Подключаемся к базе
gulp.task('db:connect', function (callback) {
    data.dbConnect();
    callback();
});

// Cоздаем структуру таблиц
gulp.task('db:create', ['db:connect'], function (callback) {
    data.dbCreate(callback);
});

// Удаляем таблицы
gulp.task('db:drop', ['db:connect'], function (callback) {
    data.dbDrop(callback);
});

// Удаляем все таблицы и создаем новые
gulp.task('db:reload', ['db:connect'],function (callback) {
    data.dbReload(callback);
});

// Записываем тестовые данные
gulp.task('db:data-test:create', ['db:connect'], function (callback) {
    data.dbTestDateCreate(callback);
});

// Удаляем таблицы и перезаписываем тестовые данные
gulp.task('db:data-test:reload', ['db:connect'], function (callback) {
    data.dbTestDateReload(callback);
});



//Перезаписываем вообще все + тестовые данные
gulp.task('reset', ['redis:connect', 'db:connect'], function (callback) {
    data.dbTestDateReload(function () {
        data.redisReload(callback);
    });
});



