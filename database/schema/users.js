module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'users',
            {
                user_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                login: Sequelize.STRING(256),
                email: Sequelize.STRING(256),
                password: Sequelize.STRING(256),
                token: Sequelize.STRING(256),
                created_at: {
                    type: Sequelize.DATE
                },
                updated_at: {
                    type: Sequelize.DATE
                }
            },
            {
                engine: 'MYISAM',                     // default: 'InnoDB'
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('users');
    }
};
