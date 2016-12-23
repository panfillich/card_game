module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'users',
            {
                userId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                login: Sequelize.STRING(256),
                email: Sequelize.STRING(256),
                password: Sequelize.STRING(256),
                webToken: Sequelize.STRING(512),
                webTokenCreate: Sequelize.DATE,
                gameToken: Sequelize.STRING(512),
                gameTokenCreate: Sequelize.DATE,
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
                engine: 'InnoDB',                     // default: 'InnoDB'
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('users');
    }
};
