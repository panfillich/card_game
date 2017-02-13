const constants = {
    table_name: 'cards',
    type: {
        COMMON: 0,
        HERO_1: 1,
        HERO_2: 2,
        HERO_3: 3,
        GOD_1: 101,
        GOD_2: 102
    },
    rarity: {
        NO_RATING:  0,
        COMMON:     1,
        RARE:       2,
        MYSTICAL:   3,
        LEGEND:     4
    }
}

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name: constants.table_name,
        fields: {
            cardId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            // Тип карты
            type: {
                type:DataTypes.INTEGER,
                defaultValue: constants.type.COMMON
            },

            // Редкость карты
            rarity: {
                type:DataTypes.INTEGER,
                defaultValue: constants.rarity.COMMON,
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
        const: constants
    }
}

module.exports = {
    constants: constants,
    get_schema: get_schema
}
