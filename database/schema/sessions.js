let table_name = 'sessions';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            table_name,
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

        console.log('Table "'+table_name+'" is created.');
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable(table_name);
        console.log('Table "'+table_name+'" is deleted.');
    }
};
