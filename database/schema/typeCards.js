module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            'typeCards',
            {
                typeCardsId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
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
        return queryInterface.dropTable('typeCards');
    }
};