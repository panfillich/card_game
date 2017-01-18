let log = require('../common_libs/logger')(module);
let app = require('./app');

let port = 3003;

let server = app.listen(port, function() {
    log.info('PublicAPI listening on port %d', port);
});

module.exports = server;