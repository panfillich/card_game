module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define("users", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: DataTypes.STRING(256),
        email: DataTypes.STRING(256),
        password: DataTypes.STRING(256),
        token: DataTypes.STRING(256),
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
}
