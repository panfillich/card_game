let create = require('./create');
let drop   = require('./drop');

let reload = function (callback) {
    drop(function () {
        create(callback);
    });
};

module.exports = reload;


