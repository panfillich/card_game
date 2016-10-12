'use strict'

//Запуск вручную npm run webpack имя файла и папка куда

module.exports = {
    context: __dirname + "/webpack_project",
    entry: "./home.js",
    output: {
        path: __dirname + "/webpack_project",
        filename: "builds.js",
        //Весь модуль будет засунут в переменную window.my_library
        library: "my_library"
    },

    watch:true,    //Автообновление

    watchOptions: {
        poll: true, //Для Vagrant
        aggregateTimeout: 50 //Задержка
    },

    //Для отладки
    devtool: "source-map",

    //ES7(ES2016) to ES6(ES2015)
    module: {
        loaders:[
            {
                test:   /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};