let get_list_schemas = require('./schema');

module.exports = function(Sequelize, DataTypes) {

    let schemas = get_list_schemas(Sequelize, DataTypes);

    let return_models = [];
    let models = {}

    schemas.forEach(function (schema) {
        models[schema.table_name] = Sequelize.define(
            schema.table_name,
            schema.fields,
            schema.properties
        );
        return_models.push(models[schema.table_name]);
    });

    models['users'].hasMany(models['comments'], {foreignKey: 'userId', targetKey: 'userId'});
    models['comments'].belongsTo(models['users'], {foreignKey: 'userId', targetKey: 'userId'});

    models['friends'].belongsTo(models['users'], {
        foreignKey: 'friendId',
        otherKey: 'userId',
        as: 'UsersFriends'
    });

    models['cards'].belongsTo(models['collections'], {
        foreignKey: 'cardId',
        targetKey: 'cardId',
        as: 'UsersCollection'
    });

    return return_models;
}