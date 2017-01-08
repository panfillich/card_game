// https://habrahabr.ru/post/193458/#p1
let express = require('express');

let app = express();
let log = require('../common_libs/logger')(module);

let initialisers = [
    require('./config'),
    require('./controllers')
];

let port = 3003;

let storage = { //
    express: app,
    basePath: __dirname
};


var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

let orm = require("../database");
let get_models_list = require("../models");
let client = require("../redis/client")

client.set("string key", "string val");
client.hset("users:1", "name", "Andrew");
client.hset("users:1", "email", "andrew@example.com");
client.hgetall("users:1", function (err, res) {
    console.log(res); //
});

app.get('/tet7', function (req, res) {
    console.log(client.closing);
    res.json({////////
        pong: true
    })
});

orm.sequelize.sync().then(function () {

    storage.models = get_models_list(orm);

    initialisers.forEach(function(initializer) {
        initializer(storage);
    });


    let server = app.listen(port, function() {
        console.log('api_public listening on port %d', 3003);
    });

    server.on('close', function () {
        console.log(111);
    })

    let user =  storage.models.users;
    user.get_auth_info({email:'user1@gmail.com',password:'1Qwerty123!'}, function (result, error) {
       if(!error){
           console.log(result);
       }
    });


    user.set_token({email:'user1@gmail.com', userId:2, type:'web'},function (result, error) {
        console.log(result);
    });

    // server.close(function() { console.log('Doh :('); });
});




