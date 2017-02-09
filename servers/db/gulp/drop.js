let get_list_schemas    = require('../schema');

let log =  console.log;
let cLog  = function (message) {
    log('\x1b[33m%s\x1b[0m: ', 'Deleting tables', message);  //yellow
}

let drop = function (db, callback) {
    let queryInterface  = db.sequelize.queryInterface;
    let DataTypes       = db.sequelize.Sequelize;

    cLog('start');

    let finalAction = function () {
        cLog('completed successfully');
        if(callback) {
            callback();
        }
    };

    let list_schemas    = get_list_schemas(DataTypes, DataTypes);

    let all_async_actions = list_schemas.length;
    let current_async_actions = 0;

    list_schemas.forEach(function (schema) {
        queryInterface.dropTable(schema.table_name)
            .then(function () {
                log(`[${schema.table_name}]: table deleted`);
                current_async_actions++;
                if(all_async_actions == current_async_actions){
                    finalAction();
                }
            })
            .catch(function (error) {
                log(`[${schema.table_name}]: table wasn't delete`);
                log(`[${schema.table_name}]: '${error}'`);
            });
    });
};
module.exports = drop;

