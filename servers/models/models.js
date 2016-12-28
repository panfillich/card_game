module.exports = function(Sequelize, DataTypes) {

    let Users = Sequelize.define("users", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: DataTypes.STRING(256),
        email: DataTypes.STRING(256),
        password: DataTypes.STRING(256),
        webToken: DataTypes.STRING(512),
        webTokenCreate: DataTypes.DATE,
        gameToken: DataTypes.STRING(512),
        gameTokenCreate: DataTypes.DATE,
        status: {
            type: DataTypes.INTEGER(2),
            defaultValue: 0
            //0 - в ожидании подтверждения регистрации
            //1 - зарегестрирован
            //2 - забанен
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
    {
        engine: 'InnoDB',// default: 'InnoDB'
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
}
