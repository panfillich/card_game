let webpack = require("webpack");
let JavaScriptObfuscator = require("webpack-obfuscator");
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let cssNameFormat = '[name]';

module.exports = {
    context: __dirname + "/frontend",
    entry: {
        index : ["webpack-dev-server/client",'webpack/hot/dev-server', "./index"]
        // "home": "./js/home",
        // "s_chat": "./js/chat",
        // "g_start": "./js/game/start",
        //"s_common": "./common"
        // Для включения в общую сборку нескольких файлов:
        //  common: ["./common", "./welcom"]
    },
    //extensions: ['.js', '.jsx'],
    output: {
        path: __dirname + "/public",
        // publicPath: "/",
        filename: "[name].js",
        //Весь модуль будет засунут в переменную window.my_library_name
        //library:  "[name]",
        //Папка для динамической загрузки
        publicPath: '/'
    },

    watch: true,    //Автообновление

     //Для отладки
    //devtool: "source-map",

    plugins: [
        //Файлы не создаются, если в них есть ошибки
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin(`${cssNameFormat}.css`)

        //Выделяем общую часть из всех модулей
        /*new webpack.optimize.CommonsChunkPlugin({
         name: "s_common",
         chunks: ["home", "chat"],
         minChunks: 2 //Т.е. берем общий код не из всех а хотябы из 2х
         }),*/
         //Делаем обустификацию кода
         // new JavaScriptObfuscator({
         //    rotateUnicodeArray: false
         // })
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
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')

                // loaders: ExtractTextPlugin.extract('style', 'css', 'postcss', 'sass')
            }
            //,
            // {
            //     test: /\.scss$/,
            //     loaders: ["style", "css", "sass"]
            // }
        ]
    }
}