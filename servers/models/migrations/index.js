let get_list_schemas = require('../schema');
let log = console.log;

module.exports = {
    up: function (queryInterface, DataTypes) {
        let list_schemas = get_list_schemas(DataTypes);
        list_schemas.forEach(function (schema) {
            queryInterface.createTable(
                schema.table_name,
                schema.fields,
                schema.properties
            ).then(function () {
                log(`[${schema.table_name}]: table created`);
                schema.indexes.forEach(function (index) {
                    queryInterface.addIndex(
                        schema.table_name,
                        index.fields,
                        index.properties
                    ).then(function () {
                        log(`[${schema.table_name}]: index [${index.properties.indexName}] created`);
                    }).catch(function (error) {
                        log(`[${schema.table_name}]: index wasn't create`);
                        log(`[${schema.table_name}]: '${error}'`);
                    });
                });
            }).catch(function (error) {
                log(`[${schema.table_name}]: table wasn't create`);
                log(`[${schema.table_name}]: '${error}'`);
            });;
        });
    },

    down: function (queryInterface, DataTypes) {
        let list_schemas = get_list_schemas(DataTypes);
        list_schemas.forEach(function (schema) {
            queryInterface.dropTable(schema.table_name)
                .then(function () {
                    log(`[${schema.table_name}]: table deleted`);
                })
                .catch(function (error) {
                    log(`[${schema.table_name}]: table wasn't delete`);
                    log(`[${schema.table_name}]: '${error}'`);
                });
        });
    }
}
