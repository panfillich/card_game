const consts = require('../consts/confirmation');

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name: consts.table_name,
        fields: {
            conformationId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER
            },
            token: {
                type: DataTypes.STRING(64)
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        properties: {
            engine: 'MYISAM',  // default: 'InnoDB'
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        indexes: [
            {
                fields: ['token'],
                properties: {
                    indexName: 'token',
                    indicesType: 'UNIQUE'
                }
            }
        ],
        const: consts
    }
}

module.exports = {
    constants: consts,
    get_schema: get_schema
}