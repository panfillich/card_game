// подключаем gulp
var gulp = require('gulp');

// Подключаем gulp-util (Для отображения информации)
var gutil = require("gulp-util");

// Подключаем webpack (ES7->ES6 and Many JS -> One JS)
var webpack = require("webpack");

//Плагин для webpack (обфустификатор, 2 модуля )
var JavaScriptObfuscator = require('webpack-obfuscator');

let WebpackDevServer = require('webpack-dev-server');

module.exports = function(dirname) {

    let configuration = {
        context: dirname + "/frontend",
        entry: {
            "s_home": "./js/home",
            "s_chat": "./js/chat",
            "g_start": "./js/game/start",
            //"s_common": "./common"
            // Для включения в общую сборку нескольких файлов:
            //  common: ["./common", "./welcom"]
        },
        output: {
            path: dirname + "/public/js",
            filename: "[name].js",
            //Весь модуль будет засунут в переменную window.my_library_name
            //library:  "[name]",
            //Папка для динамической загрузки
            publicPath: '/public/'
        },

        devServer: {
            inline: true,
            port: 3002
        },

        devtool : 'eval',

        debug : true,

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
                },
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"]
                }
            ]
        }
    };

    gulp.task("webpack-dev-server", function(callback) {
        // Start a webpack-dev-server
        var compiler = webpack(configuration, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            //callback();
        });

        new WebpackDevServer(compiler, {
            stats: {
                colors: true
            }
        }).listen(3002, "localhost", function(err) {
            if(err) throw new gutil.PluginError("webpack-dev-server", err);
            // Server listening
            gutil.log(err);
            gutil.log("[webpack-dev-server]", "http://localhost:3002/webpack-dev-server/index.html");

            // keep the server alive or continue?
            // callback();
        });
    });


    gulp.task("webpack_js", function () {
        webpack({
            context: dirname + "/frontend",
            entry: {
                "s_home": "./js/home",
                "s_chat": "./js/chat",
                "g_start": "./js/game/start",
                //"s_common": "./common"
                // Для включения в общую сборку нескольких файлов:
                //  common: ["./common", "./welcom"]
            },
            output: {
                path: dirname + "/public/js",
                filename: "[name].js",
                //Весь модуль будет засунут в переменную window.my_library_name
                //library:  "[name]",
                //Папка для динамической загрузки
                //publicPath: '/js/'
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
                new webpack.NoErrorsPlugin(),
                //Выделяем общую часть из всех модулей
                new webpack.optimize.CommonsChunkPlugin({
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
                    },
                    {
                        test: /\.scss$/,
                        loaders: ["style", "css", "sass"]
                    }
                ]
            },
            devServer: {
                host: 'localhost',
                port: 3000
            }
        }, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            //callback();
        });
    });
}