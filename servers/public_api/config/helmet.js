let helmet = require('helmet');

module.exports  = function(config) {
    let app = config.express;
    app.use(helmet());

    //https://helmetjs.github.io/docs/nocache/
    //Устанавливаем запрет кэширование ответа
    //app.use(helmet.noCache())
};