const consts = require('../consts/messages');

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name: 'friends',
        fields: {
            recordId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER
            },
            friendId: {
                type: DataTypes.INTEGER
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        properties: {
            engine: 'InnoDB', // default: 'InnoDB'
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        indexes: [
            {
                fields: ['userId'],
                properties: {
                    indexName: 'user_id',
                }
            },
            {
                fields: ['friendId'],
                properties: {
                    indexName: 'friend_id',
                }
            }
        ]
    }
}

module.exports = {
    constants: consts,
    get_schema: get_schema
}
