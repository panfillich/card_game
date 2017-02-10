const constants = {
    table_name: 'cards',
    type: {
        COMMON: 0,
        HERO1: 1,
        HERO2: 2,
        HERO3: 3,
        GOD1: 101,
        GOD2: 102
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
            // Название карты
            title: DataTypes.STRING(50),

            // Описание карты
            description: DataTypes.STRING(140),

            // Тип карты
            type: {
                type:DataTypes.INTEGER,
                defaultValue: constants.type.COMMON
            },

            // Редкость карты
            rarity: {
                type:DataTypes.INTEGER,
                defaultValue: 1
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
                fields: ['publishStatus', 'type', 'publishAt'],
                properties: {
                    indexName: 'status_article_date'
                }
            },
            {
                fields: ['publishStatus', 'type', 'articleId'],
                properties: {
                    indexName: 'status_article',
                    indicesType: 'UNIQUE'
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
