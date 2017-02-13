const constants = {
    table_name: 'decks',
    type:{
        DEFAULT: 1,
        COMMON:  0
    }
};

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name: constants.table_name,
        fields: {
            deckId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            userId: {
                type:DataTypes.INTEGER
            },

            // Номер колоды
            number: {
                type: DataTypes.INTEGER
            },

            // Карта
            cardId: {
                type: DataTypes.INTEGER
            },

            // Колличество конкретной карты в колоде
            count: {
                type: DataTypes.INTEGER
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
            engine: 'InnoDB', // default: 'MYISAM'
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        indexes: [
            {
                fields: ['userId', 'number'],
                properties: {
                    indexName: 'userId_number'
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
