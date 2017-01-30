let data_test_create    = require('./data-test-create');
let reload_schema       = require('./reload');

let data_test_reload = function (callback) {
    reload_schema(function () {
        data_test_create(callback);
    });
};
data_test_reload();
module.exports = data_test_reload;
