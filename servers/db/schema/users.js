const consts = require('../consts/users');

let get_schema = function(Sequelize, DataTypes){
    return {
        table_name : consts.table_name,
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
                defaultValue: consts.status.INVITED
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
    constants:  consts,
    get_schema: get_schema
}
