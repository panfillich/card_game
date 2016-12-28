let table_name = 'achievesType';

let Alerts = require('../lib/alerts');
let alerts = new Alerts(table_name);

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            table_name,
            {
                achieveTypeId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING(64)
                },
                description: {
                    type: Sequelize.STRING(512)
                },
                img: {
                    type: Sequelize.STRING(255)
                }
            },
            {
                engine: 'MYISAM', // default: 'InnoDB'
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        )
        .then(function () {
            alerts.table_created();
        })
        .catch(function (error) {
            alerts.table_not_created(error);
        });
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable(table_name)
            .then(function () {
                alerts.table_deleted()
            })
            .catch(function (error) {
                alerts.table_not_deleted(error)
            });
    }
};
