
let add_data = function (queryInterface, Sequelize) {
    require('./users').up(queryInterface, Sequelize);
    require('./news').up(queryInterface, Sequelize);
}

module.exports = {
    up: add_data
}