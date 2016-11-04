// подключаем gulp
var gulp = require('gulp');

// Подключаем gulp-sass
var sass = require('gulp-sass');

// Подключаем gulp-nodemon
var nodemon = require('gulp-nodemon');

// Подключаем webpack (ES7->ES6 and Many JS -> One JS)
var webpack = require("webpack");

//Плагин для webpack (обфустификатор, 2 модуля )
var JavaScriptObfuscator = require('webpack-obfuscator');

// Подключаем gulp-util (Для отображения информации)
var gutil = require("gulp-util");

//Запускаем всё $ gulp
gulp.task('default', ['webpack','scss','run']);

// Отслеживаем изменения во всех файлах кроме нижеперечисленных
gulp.task('run', function() {
    nodemon({
        script: 'local.js',
        ext: 'js ejs html json scss',
        env: { NODE_ENV: 'dev' },   //Переменные окружения dev || prod
        legacyWatch: true,          //Для Vagrant
        ignore: [
            'public/css/**',
            'node_modules/**',
            //'frontend/js/game/**/*.*',
            'public/**',
            '.git/**',
            '.vagrant/**',
            '.idea/**'
        ]
    }).on('restart', function (files) {
        console.log(files);
    });
    gulp.watch(__dirname + '/frontend/scss/**/*.scss', ['scss']);
    gulp.watch(__dirname + '/frontend/js/**/*.js', ['webpack']);
    /*gulp.watch(__dirname + '/frontend/js/game/*.js', ['obfuscation']);*/
});

gulp.task('scss', function() {
    // Получаем все файлы с окончанием .scss в папке public/scss и дочерних директориях
    return gulp.src('frontend/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
});

gulp.task("webpack", function() {
    // run webpack
    webpack({
        context: __dirname + "/frontend/js",
        entry: {
            "s_home": "./home",
            "s_chat": "./chat",
            "g_start": "./game/start",
            //"s_common": "./common"
            // Для включения в общую сборку нескольких файлов:
            //  common: ["./common", "./welcom"]
        },
        output: {
            path: __dirname + "/public/js",
            filename: "[name].js",
            //Весь модуль будет засунут в переменную window.my_library_name
            library:  "[name]",
            //Папка для динамической загрузки
            publicPath:'/js/'
        },

        watch:false,    //Автообновление

        watchOptions: {
            poll: true, //Для Vagrant
            aggregateTimeout: 50 //Задержка
        },

        //Для отладки
        // devtool: "source-map",

        plugins:[
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
            noParse: [ /.*(pixi\.js).*/ ],
            loaders:[
                {
                    test:   /\.js?$/,
                    loader: 'babel',
                    exclude: /\.cocos2d.js/,
                    query: {
                        compact: false,
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.json$/,
                    loader: "json"
                }
            ]
        }
    }, function(err, stats) {
            if(err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({
                 // output options
            }));
           //callback();
    });
});


var obfuscate = require('gulp-obfuscate');

gulp.task('obfuscation', function () {
    return gulp.src('public/js/obf/**/*.js')
        .pipe(obfuscate())
        .pipe(gulp.dest('obf'));
});


