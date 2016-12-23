module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define("users", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: DataTypes.STRING(256),
        email: DataTypes.STRING(256),
        password: DataTypes.STRING(256),
        webToken: Sequelize.STRING(512),
        webTokenCreate: Sequelize.DATE,
        gameToken: Sequelize.STRING(512),
        gameTokenCreate: Sequelize.DATE/*,
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }*/
    });
}
