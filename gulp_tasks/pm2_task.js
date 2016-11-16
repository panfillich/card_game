// Для работы в нескольких потоков
var pm2 = require('pm2');

// подключаем gulp
let gulp = require('gulp');

// Подключаем gulp-nodemon
var nodemon = require('gulp-nodemon');

let task_name = 'api_public';

let pm2_task = {
    setFullName : 123,
    setShortName : 145,
    run : function(){
        gulp.task('api_public', function() {
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
        });
    }
}


module.exports = pm2_task;

