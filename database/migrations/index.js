let data = require('../data');
let schema = require('../schema');

module.exports = {
    up: function (queryInterface, Sequelize) {
        schema.up(queryInterface, Sequelize);
        data.up(queryInterface, Sequelize);
    },

    down: function (queryInterface, Sequelize) {
        schema.down(queryInterface, Sequelize);
    }
}