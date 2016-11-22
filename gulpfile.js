// подключаем gulp
let gulp        = require('gulp');

//-------------| Серверная часть |-------------------------//
// Общий шаблон/класс для работы с pm2
let Pm2_task    = require('./gulp/pm2_task.js');

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
    config.debug = true;
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
        publicPath: "/",
        contentBase: __dirname + "/public/",
        stats: {
            colors: true
        },
        // historyApiFallback: {
        //     index: 'index.html'
        // }
        proxy:{
            '/pub-api':{
                target: 'http://localhost:3003',
                pathRewrite: {'/pub-api' : '/'}
            },
            '/priv-api':{
                target: 'http://localhost:3002',
                pathRewrite:{'/priv-api':'/'}
            },
            /*'/public':{
                target: 'http://localhost:3000',
                pathRewrite:{'/public':'/'}
            }*/
        }

    }).listen(3000, '0.0.0.0', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/index.html');
    });
});

gulp.task('default', ['start_servers', 'check_servers', 'webpack-dev-server']);


