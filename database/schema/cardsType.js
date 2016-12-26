let table_name = 'cardsType';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable(
            table_name,
            {
                cardTypeId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING(32)
                },
                descriptionShort: {
                    type: Sequelize.STRING(128),
                    defaultValue: ''
                },
                descriptionFull:{
                    type: Sequelize.STRING(512),
                    defaultValue: ''
                },
                imgCard:{ //картинка
                    type: Sequelize.STRING(255)
                },
                framing:{ //обрамление
                    type: Sequelize.INTEGER(3),
                    defaultValue: 0
                },
                type: {
                    type: Sequelize.INTEGER(2),
                    defaultValue: 0
                    //0 - обычная карта
                    //1 - спец. карта
                },
                cost: {
                    type: Sequelize.INTEGER(3),
                    defaultValue: 0
                },
                attack: {
                    type: Sequelize.INTEGER(3),
                    defaultValue: 0
                },
                life: {
                    type: Sequelize.INTEGER(3),
                    defaultValue: 0
                },
                protection: {
                    type: Sequelize.INTEGER(2),
                    defaultValue: 0
                    // 0 - нет защиты
                    // 1 - физ защита
                    // 2 - маг защита
                    // 3 - полная защита
                },
                ability: { //способность
                    type: Sequelize.INTEGER(3),
                    defaultValue: 0
                    //0 - без способностей
                }
            },
            {
                engine: 'MYISAM',                     // default: 'InnoDB'
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