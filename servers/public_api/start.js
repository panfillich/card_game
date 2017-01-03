// https://habrahabr.ru/post/193458/#p1
let express = require('express');

let app = express();
let log = require('../common_libs/logger')(module);

let initialisers = [
    require('./config'),
    require('./controllers')
];

let port = 3003;

let storage = {
    express: app,
    basePath: __dirname
};


var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(session({ resave: true, saveUninitialized: true,
    secret: 'uwotm8' }));



let orm = require("../database");
let get_models_list = require("../database/models");

orm.sequelize.sync().then(function () {

    storage.models = get_models_list(orm);

    initialisers.forEach(function(initializer) {
        initializer(storage);
    });

    app.listen(port, function() {
        console.log('api_public listening on port %d', 3003);
    });

    let user =  storage.models.users;
    user.get_auth_info({email:'user1@gmail.com',password:'1Qwerty123!'}, function (result, error) {
       if(!error){
           console.log(result);
       }
    });

    user.set_token({email:'user1@gmail.com', userId:2, type:'web'},function (result, error) {
        console.log(result);
    });
});




