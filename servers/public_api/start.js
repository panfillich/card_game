// https://habrahabr.ru/post/193458/#p1
let express = require('express');

let app = express();
let log = require('../common_libs/logger')(module);

let initialisers = [
    require('./config'),
    require('./controllers')
];

let port = 3003;

let config = {
    express: app,
    basePath: __dirname
};


var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(session({ resave: true, saveUninitialized: true,
    secret: 'uwotm8' }));

app.use(function(req, res, next){
    console.log(1);

    next();
});

// pass the csrfToken to the view
app.get('/form', function(req, res) {

})

app.get('/test', function (req, res) {
    res.send("Hello World! It's public-API99999999!");
});

initialisers.forEach(function(initializer) {
    initializer(config);
});

let orm = require("../database");
let User = require('../database/models/users');
orm.sequelize.sync().then(function () {
    app.listen(port, function() {
        console.log('api_public listening on port ' + 3003);
    });

    /*orm.users.findById(1,{ include : [orm.comments] }).then(function(project) {
        console.log(project.dataValues);
    });

    orm.users.findById(1).then(function(project) {
        log.info(project.dataValues);
    });*/

    let user = new User({db:orm});
    user.get_auth_info({login:'user1',password:'1Qwerty123!'}, function (result, error) {
       if(!error){
           console.log(result);
       }
    });

    user.set_token({email:'user1@gmail.com', userId:2, type:'web'},function (result, error) {
        console.log(result);
    });

    /*app.on('error', function(){
        console.log('Error to connect ' + port);//
    });*/
    app.on('listening', function(){
        console.log('api_public listening on port ' + port);
    });
});




