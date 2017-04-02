let server  = require('./server');

let io   = require('socket.io').listen(server);

module.exports = io;