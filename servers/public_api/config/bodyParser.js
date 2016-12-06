let bodyParser = require('body-parser');

module.exports = function(config) {
    let app = config.express;
    //Лимит на обработку запроса
    app.use(bodyParser.json({limit: '100kb'})); //'1mb'
    app.use(bodyParser.urlencoded({limit: '100kb', extended: false})); //'1mb'
}