module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'sessions',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                payload: Sequelize.STRING(256),
                lastActivity: Sequelize.INTEGER
            },
            {
                engine: 'InnoDB',
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('sessions');
    }
};
