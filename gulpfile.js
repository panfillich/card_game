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

// Для работы в нескольких потоков
var pm2 = require('pm2');


// let api_public_task = require("./gulp_tasks/api_public");
// api_public_task.run();
//
// let api_private_task = require("./gulp_tasks/api_private");
// api_private_task.run();

gulp.task('server', function() {
    nodemon({
        script: 'servers/public_api/start.js',
        ext: 'js ejs html json scss',
        env: { NODE_ENV: 'dev' },   //Переменные окружения dev || prod
        legacyWatch: true,          //Для Vagrant
        watch: [
            'servers/public_api/**/*.js'
        ]
    }).on('restart', function (files) {
        console.log(files);
    });

    nodemon({
        script: 'servers/private_api/start.js',
        ext: 'js ejs html json scss',
        env: { NODE_ENV: 'dev' },   //Переменные окружения dev || prod
        legacyWatch: true,          //Для Vagrant
        watch: [
            'servers/private_api/**/*.js'
        ]
    }).on('restart', function (files) {
        console.log(files);
    });
});

//Запускаем всё $ gulp


gulp.task('private_api_start', function () {
    pm2.connect(true, function () {

        pm2.start({
            name: 'private_api',
            script: 'servers/private_api/start.js',
            env: {
                "NODE_ENV": "dev"
            }
        });

        pm2.streamLogs('private_api', 0);
    });
});

gulp.task('public_api_start', function () {
    pm2.connect(true, function () {

        pm2.start({
            name: 'public_api',
            script: 'servers/public_api/start.js',
            env: {
                "NODE_ENV": "dev"
            }
        })

        pm2.streamLogs('public_api', 0);
    });
});


gulp.task('private_api_reload', function () {
    pm2.connect(true, function () {
        pm2.restart('private_api',  function(err, apps) {
            pm2.disconnect();   // Disconnect from PM2
            if (err) throw err
        });
        pm2.streamLogs('private_api', 0);
    });
});

gulp.task('public_api_reload', function () {
    pm2.connect(true, function () {
        pm2.restart('public_api',  function(err, apps) {
            pm2.disconnect();   // Disconnect from PM2
            if (err) throw err
        });
        pm2.streamLogs('public_api', 0);
    });
});

gulp.task('start_servers', ['private_api_start', 'public_api_start']);

gulp.task('check_servers', function () {
    gulp.watch(__dirname + '/servers/private_api/**/*.*', ['private_api_reload']);
    gulp.watch(__dirname + '/servers/public_api/**/*.*', ['public_api_reload']);
});

gulp.task('default', ['start_servers', 'check_servers']);
// gulp.task('default', [api_public_task.name, api_private_task.name]);