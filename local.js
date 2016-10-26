#!/usr/bin/env node
'use strict';

var app = require('./server/app.js');
//var https = require('https');
//var fs = require('fs');
var server;
var envConfig = require('./server/config');

const ENV_NODE = process.env.NODE_ENV || 'prod';


server = app.listen(envConfig.apiPort, function() {
    console.log('Server listening on port ' + server.address().port);
});
