// подключаем gulp
let gulp        = require('gulp');

//-------------| Серверная часть |-------------------------//
// Общий шаблон/класс для работы с pm2
let Pm2_task    = require('./gulp/pm2_task.js');

let public_api  = new Pm2_task('public_api','pub_api');
//let private_api = new Pm2_task('private_api','priv_api');

var gutil = require("gulp-util");

// Подключаем webpack (ES7->ES6 and Many JS -> One JS)
var webpack = require("webpack");

let WebpackDevServer = require('webpack-dev-server');

//Таски, которые запускают процессы
public_api.start();
//private_api.start();
gulp.task('start_servers', [
    public_api.startName,
    //private_api.startName
]);

//Таски, которые перезапускают процессы
public_api.reload();
//private_api.reload();

//Мониторинг изменения файлов в папке servers
//и перезапуск соответствующего процесса
gulp.task('check_servers', function () {
    public_api.watch();
    //private_api.watch();
});
//---------------------------------------------------------//


//-------------| Клиентская часть |------------------------//
//Таски webpack
// let webpack_task = require('./gulp/webpack_task');
//
// webpack_task(__dirname);

// gulp.task('webpack_start', ['webpack_js']);

// gulp.task('webpack_reload', function () {
//     gulp.watch(__dirname + '/frontend/js/**/*.js', ['webpack_js']);
// });

gulp.task('default', ['start_servers', 'check_servers', 'webpack_start']);


gulp.task('webpack-dev-server', function (c) {

    var webpackConfig = {
        context: __dirname + "/frontend",
        entry: {
            "s_home": "./js/home",
            // "s_chat": "./js/chat",
            // "g_start": "./js/game/start",
            //"s_common": "./common"
            // Для включения в общую сборку нескольких файлов:
            //  common: ["./common", "./welcom"]
        },
        output: {
            path: __dirname + "/public/js",
            filename: "[name].js",
            //Весь модуль будет засунут в переменную window.my_library_name
            //library:  "[name]",
            //Папка для динамической загрузки
            publicPath: __dirname + '/public/'
        },


        watchOptions: {
            // Delay the rebuild after the first change
            aggregateTimeout: 300,
            // Poll using interval (in ms, accepts boolean too)
            poll: 1000
        },

        devServer: {
            inline: true,
            port: 3002,
            host: '0.0.0.0',
            hot: true
        },

        watch: false,    //Автообновление

        watchOptions: {
            poll: true, //Для Vagrant
            aggregateTimeout: 50 //Задержка
        },

        //Для отладки
        // devtool: "source-map",

        plugins: [
            //Файлы не создаются, если в них есть ошибки
            new webpack.NoErrorsPlugin()
            //Выделяем общую часть из всех модулей
            /*new webpack.optimize.CommonsChunkPlugin({
             name: "s_common",
             chunks: ["home", "chat"],
             minChunks: 2 //Т.е. берем общий код не из всех а хотябы из 2х
             })/*,
             //Делаем обустификацию кода
             new JavaScriptObfuscator({
             rotateUnicodeArray: false
             })*/
        ],

        //ES7(ES2016) to ES6(ES2015)
        module: {
            noParse: [/.*(pixi\.js).*/],
            loaders: [
                {
                    test: /\.js?$/,
                    loader: 'babel',
                    exclude: [/node_modules/],
                    query: {
                        compact: false,
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.json$/,
                    loader: "json"
                }//,
                // {
                //     test: /\.scss$/,
                //     loaders: ["style", "css", "sass"]
                // }
            ]
        }
    }

    var myConfig = Object.create(webpackConfig);

    myConfig.devtool = 'eval';
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        hot: true, // is this is the same as specifying --inline --hot?
        inline: true,
        port: 3002,
        host: '0.0.0.0',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000 // is this the same as specifying --watch-poll?
        },
        //publicPath: "/public/",
        stats: {
            colors: true
        }
    }).listen(3002, '0.0.0.0', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', 'http://localhost:3002/webpack-dev-server/index.html');
    });
});


