const consts = require('../consts/cards');

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name: consts.table_name,
        fields: {
            cardId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            // Тип карты
            type: {
                type:DataTypes.INTEGER,
                defaultValue: consts.type.COMMON
            },

            // Редкость карты
            rarity: {
                type:DataTypes.INTEGER,
                defaultValue: consts.rarity.COMMON,
            },

            // Обычная стоимость карты
            normalCost: {
                type:DataTypes.INTEGER,
                defaultValue: 1
            },

            // Спец. стоимость
            specialCost: {
                type:DataTypes.INTEGER,
                defaultValue: 0
            },

            // Жизни
            health: {
                type:DataTypes.INTEGER,
                defaultValue: 1
            },

            //Атака
            attack: {
                type:DataTypes.INTEGER,
                defaultValue: 1
            },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        },
        properties:  {
            engine: 'MYISAM', // default: 'InnoDB'
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        indexes: [
            {
                fields: ['type'],
                properties: {
                    indexName: 'type'
                }
            }
        ],
        const: consts
    }
}

module.exports = {
    constants: consts,
    get_schema: get_schema
}
