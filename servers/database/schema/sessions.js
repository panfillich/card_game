const constants = {
    table_name: 'sessions',
}

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name: constants.table_name,
        fields: {
            session_id: {
                type: DataTypes.STRING(128),
                primaryKey: true
            },
            expires: DataTypes.INTEGER,
            data: DataTypes.TEXT('medium')
        },
        properties:  {
            engine: 'InnoDB', // default: 'InnoDB'
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        },
        indexes: [],
        const: constants
    }
}

module.exports = {
    constants: constants,
    get_schema: get_schema
}
