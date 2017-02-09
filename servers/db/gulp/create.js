let get_list_schemas    = require('../schema');

let log   = console.log;
let cLog  = function (message) {
    log('\x1b[33m%s\x1b[0m: ', 'Creating tables', message);  //yellow
}


let create = function (db, callback) {
    let queryInterface  = db.sequelize.queryInterface;
    let DataTypes       = db.sequelize.Sequelize;

    cLog('start');  //yellow

    let finalAction = function () {
        cLog('completed successfully');
        if(callback){
            callback();
        }
    }

    let list_schemas = get_list_schemas(DataTypes, DataTypes);

    let all_async_actions = 0;
    list_schemas.forEach(function (schema) {
        all_async_actions++;
        schema.indexes.forEach(function () {
            all_async_actions++;
        });
    });

    let current_async_actions = 0;
    list_schemas.forEach(function (schema) {
        queryInterface.createTable(
            schema.table_name,
            schema.fields,
            schema.properties
        ).then(function () {
            log(`[${schema.table_name}]: table created`);
            current_async_actions++;
            if(current_async_actions == all_async_actions){
                finalAction();
            }
            schema.indexes.forEach(function (index) {
                queryInterface.addIndex(
                    schema.table_name,
                    index.fields,
                    index.properties
                ).then(function () {
                    log(`[${schema.table_name}]: index [${index.properties.indexName}] created`);
                    current_async_actions++;
                    if(current_async_actions == all_async_actions){
                        finalAction();
                    }
                }).catch(function (error) {
                    log(`[${schema.table_name}]: index wasn't create`);
                    log(`[${schema.table_name}]: '${error}'`);
                });
            });
        }).catch(function (error) {
            log(`[${schema.table_name}]: table wasn't create`);
            log(`[${schema.table_name}]: '${error}'`);
        });
    });
};

module.exports = create;


