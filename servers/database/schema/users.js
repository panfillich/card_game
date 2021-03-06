const constants = {
    table_name: "users",
    status: {
        INVITED: 0,     // пользователю выслано приглашение
        ACTIVATED:  1,  // пользователь получил приглашение, перешел по ссылке и был активирован
        BANNED: 2       // пользователь забанен
    },
}

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name : constants.table_name,
        fields: {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            login: DataTypes.STRING(128),
            email: DataTypes.STRING(128),
            password: DataTypes.STRING(256),
            webToken: DataTypes.STRING(512),
            webTokenCreate: DataTypes.DATE,
            gameToken: DataTypes.STRING(512),
            gameTokenCreate: DataTypes.DATE,
            status: {
                type: DataTypes.INTEGER(2),
                defaultValue: constants.status.INVITED
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        properties: {
            engine: 'InnoDB',// default: 'InnoDB'
            charset: 'utf8',
            collate: 'utf8_general_ci'
        },
        indexes:[]
    }
};

module.exports = {
    constants: constants,
    get_schema: get_schema
}
