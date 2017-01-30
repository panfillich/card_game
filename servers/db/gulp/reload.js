let create = require('./create');
let drop   = require('./drop');

let reload = function (callback) {
    drop(function () {
        create(callback);
    });
};
reload()
module.exports = reload;


