#!/usr/bin/env node
'use strict';

var app = require('./server/app');
//var https = require('https');
//var fs = require('fs');
var server;
var envConfig = require('./server/config');

const ENV_NODE = process.env.NODE_ENV || 'prod';

if (envConfig.useSSL) {
    // var options = {
    //     key: fs.readFileSync(envConfig.path.SSLKey, 'utf8'),
    //     cert: fs.readFileSync(envConfig.path.SSLCert, 'utf8')
    // };
    //
    // server = https.createServer(options, app).listen(envConfig.apiPort, function () {
    //     console.log('SeniorLink API server listening on port ' + server.address().port + '(https)');
    // });
} else {
    server = app.listen(envConfig.apiPort, function() {
        console.log('Server listening on port ' + server.address().port);
    });
}
