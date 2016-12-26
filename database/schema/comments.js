module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'comments',
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
            },
            {
                engine: 'MYISAM',                     // default: 'InnoDB'
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('comments');
    }
};
