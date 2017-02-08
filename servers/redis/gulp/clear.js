let client = require('../client');

let log   = console.log;
let cLog  = function (message) {
    log('\x1b[33m%s\x1b[0m: ', 'Clearing redis', message);  //yellow
}

let clear = function (callback) {
    cLog('start');
    client.flushdb( function (err, succeeded) {

        cLog('finish');
        callback();
    });
};

module.exports = clear;