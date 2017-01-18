let app = require('../app');
let bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '100kb'})); //'1mb'
app.use(bodyParser.urlencoded({
    limit: '100kb',
    extended: true
})); //'1mb'

// console.log("BodyParser's config is set.");
