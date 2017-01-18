let log = require('../common_libs/logger')(module);

let redis = require("redis");

let option = {
    host: '127.0.0.1',
    port: 6379,
    retry_strategy: function (options) {
        console.log(Math.min(options.attempt * 100, 3000));
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return 0;
    }
    // detect_buffers: true
};

function setEvents(client) {
    client.on("error", function (err) {
        console.log("Error " + err);
    });

    client.on("reconnecting", function () {
        console.log("reconnecting");
    });

    client.on("connect", function () {
        // console.log("connect");
    });

    client.on("ready", function () {
        log.info("Connect to Redis is ready");
    });

    client.on("end", function () {
        console.log("end");
        client.quit()
        client = redis.createClient(option);
        setEvents(client);
    });
}

let client = redis.createClient(option);
setEvents(client);

module.exports = client;

