const consts = require('../consts/collections');

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name: consts.table_name,
        fields: {
            collectionId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            userId: {
                type:DataTypes.INTEGER
            },

            cardId: {
                type:DataTypes.INTEGER
            },

            count: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        },
        properties:  {
            engine: 'InnoDB', // default: 'MYISAM'
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        indexes: [
            {
                fields: ['userId'],
                properties: {
                    indexName: 'userId'
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
