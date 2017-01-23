let log = console.log;

module.exports = {
    up: function (queryInterface, DataTypes) {
        let list_data = require('../data');
        list_data.forEach(function (data) {

            queryInterface.bulkInsert(data.table_name, data.list_data, data.properties)
                .then(function(){
                    log(`[${data.table_name}]: data added`);
                }).catch(function (error) {
                    log(`[${data.table_name}]: data wasn't added`);
                    log(`[${data.table_name}]: '${error}'`);
                });
        });
    },

    down: function (queryInterface, DataTypes) {

    }
}
