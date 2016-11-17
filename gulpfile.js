// подключаем gulp
let gulp = require('gulp');

let Pm2_task = require('./gulp/pm2_task.js');

let public_api = new Pm2_task('public_api','pub_api');
let private_api = new Pm2_task('private_api','priv_api');

public_api.run();
private_api.run();

//Запуск процессов
gulp.task('start_servers', [
    public_api.fullName + '_start',
    private_api.fullName + '_start'
]);

//Проверка и перезапуск процесса в случае изменения файла
gulp.task('check_servers', function () {
    public_api.watch();
    private_api.watch();
});

gulp.task('default', ['start_servers', 'check_servers']);

// let api_public_task = require("./gulp_tasks/api_public");
// api_public_task.run();
//
// let api_private_task = require("./gulp_tasks/api_private");
// api_private_task.run();
//Запускаем всё $ gulp
