let table_name = 'messages';

let Alerts = require('../lib/alerts');
let alerts = new Alerts(table_name);

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
        ).then(function(){
            alerts.table_created();

            queryInterface.addIndex(
                table_name,
                ['userIdFrom', 'userIdTo', 'createdAt'],
                {
                    indexName: 'from_to_date',
                    indicesType: 'UNIQUE'
                }
            ).then(function () {
                alerts.index_created('from_to_date');
            }).catch(function (error) {
                alerts.index_not_created('from_to_date', error);
            });

            queryInterface.addIndex(
                table_name,
                ['userIdTo', 'userIdFrom', 'createdAt'],
                {
                    indexName: 'to_from_date',
                    indicesType: 'UNIQUE'
                }
            ).then(function () {
                alerts.index_created('to_from_date');
            }).catch(function (error) {
                alerts.index_not_created('to_from_date', error);
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
