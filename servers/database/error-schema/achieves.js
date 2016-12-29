let table_name = 'achieves';
let index_name = 'userId_createdAt';

let Alerts = require('../../../database/lib/alerts');
let alerts = new Alerts(table_name);

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            table_name,
            {
                achieveId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                achieveTypeId: {
                    type: Sequelize.INTEGER
                },
                userId: {
                    type: Sequelize.STRING(64)
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
        ).then(function () {
            alerts.table_created();
            queryInterface.addIndex(
                table_name,
                ['userId', 'createdAt'],
                {
                    indexName: index_name,
                    indicesType: 'INDEX'
                }
            ).then(function () {
                alerts.index_created(index_name);
            }).catch(function (error) {
                alerts.index_not_created(index_name, error);
            });
        }).catch(function (error) {
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
