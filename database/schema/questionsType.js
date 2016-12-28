let table_name = 'questionsType';

let Alerts = require('../lib/alerts');
let alerts = new Alerts(table_name);

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            table_name,
            {
                typeQuestionId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                question: {
                    type: Sequelize.STRING(255)
                },
                parentId: {
                    type: Sequelize.INTEGER
                },
                publishStatus: {
                    type: Sequelize.INTEGER(3),
                    defaultValue: 0
                    // 0 - не опубликован
                    // 1 - опубликован
                },
                type: {
                    type: Sequelize.INTEGER(2),
                    defaultValue: 0
                    // 0 - нет ответа
                    // 1 - предпологает ответ
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
