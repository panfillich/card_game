let table_name = 'messages';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            table_name,
            {
                messageId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                userIdFrom: {
                    type: Sequelize.INTEGER
                },
                userIdTo: {
                    type: Sequelize.INTEGER
                },
                message: {
                    type: Sequelize.STRING(512)
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                }
            },
            {
                engine: 'MYISAM', // default: 'InnoDB'
                charset: 'utf8',
                collate: 'utf8_general_ci'

            }
        ).then(() =>{
            queryInterface.addIndex(
                table_name,
                ['userIdFrom', 'userIdTo', 'createdAt'],
                {
                    indexName: 'from_to_date',
                    indicesType: 'UNIQUE'
                }
            );
            queryInterface.addIndex(
                table_name,
                ['userIdTo', 'userIdFrom', 'createdAt'],
                {
                    indexName: 'to_from_date',
                    indicesType: 'UNIQUE'
                }
            );
        });

        console.log('Table "'+table_name+'" is created.');
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable(table_name);
        console.log('Table "'+table_name+'" is deleted.');
    }
};
