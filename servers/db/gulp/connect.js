let db = require('../index');

exports.queryInterface = db.sequelize.queryInterface;
exports.DataTypes = db.sequelize.Sequelize;

