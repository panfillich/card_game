let table_name = 'users';

let Alerts = require('../lib/alerts');
let alerts = new Alerts(table_name);

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            table_name,
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
                status: {
                    type: Sequelize.INTEGER(2),
                    defaultValue: 0
                    //0 - в ожидании подтверждения регистрации
                    //1 - зарегестрирован
                    //2 - забанен
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
                indexes: [
                    // Create a unique index on email
                    {
                        unique: true,
                        fields: ['login']
                    }
                ],
                engine: 'InnoDB',// default: 'InnoDB'
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
