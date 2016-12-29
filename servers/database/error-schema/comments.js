let table_name = 'comments';

let Alerts = require('../../../database/lib/alerts');
let alerts = new Alerts(table_name);

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
        ).then(function () {
            alerts.table_created();
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
