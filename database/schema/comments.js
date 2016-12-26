let table_name = 'comments';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            table_name,
            {
                commentId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                articleId: {
                    type: Sequelize.INTEGER
                },
                userId: {
                    type: Sequelize.INTEGER
                },
                comment: {
                    type:Sequelize.TEXT('tiny')
                },
                createdAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
                }
            },
            {
                engine: 'MYISAM',                     // default: 'InnoDB'
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );

        console.log('Table "'+table_name+'" is created.');
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable(table_name);
        console.log('Table "'+table_name+'" is deleted.');
    }
};
