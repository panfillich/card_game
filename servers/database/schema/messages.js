module.exports = function(Sequelize, DataTypes){
    return {
        table_name: 'messages',
        fields: {
            messageId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userIdFrom: {
                type: DataTypes.INTEGER
            },
            userIdTo: {
                type: DataTypes.INTEGER
            },
            message: {
                type: DataTypes.STRING(512)
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        properties: {
            engine: 'MYISAM', // default: 'InnoDB'
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        indexes: [
            {
                fields: ['userIdFrom', 'userIdTo', 'createdAt'],
                properties: {
                    indexName: 'from_to_date',
                    indicesType: 'UNIQUE'
                }
            },
            {
                fields: ['userIdTo', 'userIdFrom', 'createdAt'],
                properties:{
                    indexName: 'to_from_date',
                    indicesType: 'UNIQUE'
                }
            }
        ]
    }
}
