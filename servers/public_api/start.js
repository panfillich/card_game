// https://habrahabr.ru/post/193458/#p1
let express = require('express');

let app = express();
let log = require('./logger')(module);

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
let csrf = require('csurf');

app.use(bodyParser.json());
app.use(session({ resave: true, saveUninitialized: true,
    secret: 'uwotm8' }));

app.use(csrf());

app.use(function(req, res, next){
    // Expose variable to templates via locals
    res.locals.csrftoken = req.csrfToken();
    next();
});

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)

    // handle CSRF token errors here
    res.status(403)
    res.send('session has expired or form tampered with')
})

// pass the csrfToken to the view
app.get('/form', function(req, res) {
    //res.render('send', { csrfToken: req.csrfToken() })
    res.send("Hello World! It's public-API99999999!" + req.csrfToken());
})

app.get('/test', function (req, res) {
    console.log(req.session.getToken());
    res.send("Hello World! It's public-API99999999!");
});

initialisers.forEach(function(initializer) {
    initializer(config);
});

let orm = require("../database");
orm.sequelize.sync().then(function () {
    app.listen(port, function() {
        console.log('api_public listening on port ' + 3003);
    });

    log.info('111');

    orm.users.findById(1,{ include : [orm.comments] }).then(function(project) {
        console.log(project);
    });


    /*orm.users.findById(1).then(function(project) {
        log.info(project);
    });

    /*app.on('error', function(){
        console.log('Error to connect ' + port);
    });*/
    app.on('listening', function(){
        console.log('api_public listening on port ' + port);
    });
});




